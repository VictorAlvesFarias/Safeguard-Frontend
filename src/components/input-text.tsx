import React from "react"
import TextContainer, { ITextContainerProps } from '../base-components/input-text'
import { useSelector } from "../utils/hooks/selector-hooks"

const inputTextVariations = {
    default: (props: ITextContainerProps, ref) =>
        <TextContainer {...props} ref={ref} className="h-11 rounded border bg-transparent border-zinc-500  text-zinc-100 p-1 w-full flex items-center outline-2 focus-within:outline focus-within:border-transparent outline-violet-500 pl-2 cursor-text aria-disabled:bg-black aria-disabled:border-none aria-disabled:bg-opacity-30 aria-disabled:shadow-sm aria-[atomic]:animate-pulse" />,
    "default-full": (props: ITextContainerProps, ref) =>
        <TextContainer {...props} ref={ref} className="h-full rounded border bg-transparent border-zinc-500  text-zinc-100 p-1 w-full flex items-center outline-2 focus-within:outline focus-within:border-transparent outline-violet-500 pl-2 cursor-text aria-disabled:bg-black aria-disabled:border-none aria-disabled:bg-opacity-30 aria-disabled:shadow-sm aria-[atomic]:animate-pulse" />,
    'ultra-rounded': (props: ITextContainerProps, ref) =>
        <TextContainer {...props} ref={ref} className="h-11 rounded-full text-white bg-white bg-opacity-5 pl-6 items-center flex outline-2 focus-within:outline outline-violet-500 cursor-text focus-within:border-transparent aria-[atomic]:animate-pulse" />,
}

const Text = useSelector<keyof typeof inputTextVariations, ITextContainerProps>(inputTextVariations)

export default Text