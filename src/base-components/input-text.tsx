import React, { LegacyRef, forwardRef, useEffect } from "react"
import { useRef } from "react"
import { RefCallBack } from "react-hook-form"

interface ITextContainerProps {
    readonly?: boolean
    disabled?: boolean
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any
    onBlur?: (e: any) => any
    ref?: any,
    value?: any
    className: string
    placeholder?: string
    mask?: [RegExp, string]
    type?: string
    date?: string
    loading?: boolean
    debug?: boolean
}

const TextContainer = forwardRef((props: ITextContainerProps, ref: RefCallBack | LegacyRef<HTMLInputElement>) => {
    const internalRef = useRef<HTMLInputElement | null>(null);
    const propsRef = useRef(props)

    function parseCustomDate(dateStr: string, format: string): Date | null {
        const formatRegex = /^(dd|mm|yyyy)([\/\-\.])(dd|mm|yyyy)\2(dd|mm|yyyy)$/;
        if (!formatRegex.test(format)) return null;

        const separator = format.match(/[^a-zA-Z]/)?.[0];
        if (!separator) return null;

        const formatParts = format.split(separator);
        const dateParts = dateStr.split(separator);
        if (formatParts.length !== 3 || dateParts.length !== 3) return null;

        const map: { [key: string]: string } = {};
        formatParts.forEach((part, idx) => {
            map[part] = dateParts[idx];
        });

        const yyyy = map['yyyy'];
        const mm = map['mm'];
        const dd = map['dd'];

        if (!yyyy || !mm || !dd) return null;

        const isoString = `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
        const date = new Date(isoString);

        if (isNaN(date.getTime())) return null;

        return date;
    }
    function formatMask(initialValue, regex, replacement) {
        let value = initialValue

        value = value.replace(/\D/g, '')
        value = value.replace(regex, replacement)

        return value
    }
    function formatDate(dateIso: string | undefined, format: string | undefined) {
        try {
            if (dateIso == null || format == null) {
                console.error("Date value or date format is undefined.")

                return ""
            }

            if (parseCustomDate(dateIso, format) != null) {
                return dateIso
            }

            let date = new Date(dateIso)

            if (isNaN(date.valueOf())) {
                return ""
            }

            const map: Record<string, string> = {
                dd: String(date.getDate()).padStart(2, '0'),
                mm: String(date.getMonth() + 1).padStart(2, '0'),
                yyyy: String(date.getFullYear())
            }

            return format.replace(/dd|mm|yyyy/gi, matched => map[matched])
        } catch (error) {
            console.error("Value date is invalid or date format is missing.")

            return ""
        }
    }
    function handleRef(element: HTMLInputElement | null) {
        if (ref instanceof Function) {
            ref(element);
        }

        if (element == null) {
            return
        }

        if (propsRef.current.type == "date") {
            element.value = formatDate(element?.value, props?.date)
        }
        else if (propsRef.current.mask) {
            const [regex, replacement] = propsRef.current.mask;

            element.value = formatMask(element.value, regex, replacement)

        }

        internalRef.current = element;
    };
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (propsRef.current.type == "date") {
            e.target.value = formatDate(e.target.value, props?.date)
        }
        else if (propsRef.current.mask) {
            const [regex, replacement] = propsRef.current.mask;

            e.target.value = formatMask(e.target.value, regex, replacement)
        }
        else {
            e.target.value = e.target.value
        }

        propsRef.current?.onChange ? propsRef.current.onChange(e) : null
    }

    return (
        <div
            onClick={() => internalRef.current?.focus()}
            className={props.className}
            aria-disabled={props.disabled}
            aria-atomic={props.loading}
        >
            <input
                {...props}
                type="text"
                className="bg-transparent outline-none w-full h-full flex "
                placeholder={propsRef.current.placeholder}
                ref={handleRef}
                onChange={handleOnChange}
            />
        </div>
    )
})

export default TextContainer

export {
    ITextContainerProps
}