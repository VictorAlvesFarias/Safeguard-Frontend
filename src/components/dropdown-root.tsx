import { useSelector } from "../utils/hooks/selector-hooks"
import DropdownRootContainer, { IDropdownRootContainerProps} from "../base-components/dropdown-root"
import React from "react"

const dropdownRootVariations = {
    default: (_: IDropdownRootContainerProps, ref) =>
        <DropdownRootContainer {..._} ref={ref} className='h-11 rounded border text-nowrap bg-transparent border-zinc-500 outline-violet-500 p-1 w-full flex items-center outline-2 focus-within:border-opacity-0 focus-within:outline pl-2 cursor-text aria-disabled:bg-black aria-disabled:border-none aria-disabled:bg-opacity-30 aria-disabled:shadow-sm' />,
}

const DropdownRoot = useSelector<keyof typeof dropdownRootVariations, IDropdownRootContainerProps>(dropdownRootVariations)

export default DropdownRoot