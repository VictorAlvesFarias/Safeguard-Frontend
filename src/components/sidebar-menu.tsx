import React from "react"
import { useSelector } from '../utils/hooks/selector-hooks'
import SidebarMenuContainer, { IMenuContainerProps } from '../base-components/sidebar-menu'

const menuVariations = {
    default: (props: IMenuContainerProps) =>
        <SidebarMenuContainer
            {...props}
            className="max-w-60 flex-col flex-1 m-1 rounded-lg p-2 gap-2 bg-fort "
        />
}

const SidebarMenu = useSelector<keyof typeof menuVariations, IMenuContainerProps>(menuVariations)

export default SidebarMenu