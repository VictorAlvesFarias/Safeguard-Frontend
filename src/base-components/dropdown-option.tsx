import { useContext, useEffect, useRef } from "react"
import { DropdownContextObject } from "./dropdown-context"
import React from "react"
import { useEffectLog } from "../utils/hooks/log-hooks"

interface IDropdownOptionValue {
    value: any,
    label: string,
}

interface IDropdownOptionContainerProps {
    value: any,
    label: string,
    className?: string
    defaultValue?: boolean
}

function DropdownOptionContainer(props: IDropdownOptionContainerProps) {
    const { setOpen, setSelected, selected, setFilter, setOption } = useContext(DropdownContextObject)
    const addedRef = useRef(false)

    function handleSetOption() {
        setSelected(props)
        setFilter("")
        setOpen(false)
    }

    useEffect(() => {
        if (addedRef.current == false) {
            addedRef.current = true

            setOption({ label: props.label, value: props.value })
        }

        if (selected?.value == props.value) {
            setSelected(props)
            setFilter("")
        }
    }, [])

    return (
        <span onClick={handleSetOption} className={props.className} >
            {props.label}
        </span>
    )
}

export default DropdownOptionContainer

export {
    IDropdownOptionValue,
    IDropdownOptionContainerProps
}