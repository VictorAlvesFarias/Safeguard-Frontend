import React from "react"
import { componentSelector } from "../utils/helpers/component-selector"
import DropdownMenuContainer, { IDropdownMenuContainerProps } from '../base-components/dropdown-menu'

const dropdownMenuVariations = {
    default: (props: IDropdownMenuContainerProps) =>
        <DropdownMenuContainer
            {...props}
            className='rounded bg-zinc-900 text-zinc-100 p-1 gap-2 mt-1 shadow-lg max-h-40 overflow-auto'
        />
}

const DropdownMenu = componentSelector<keyof typeof dropdownMenuVariations, IDropdownMenuContainerProps>(dropdownMenuVariations)

export default DropdownMenu
