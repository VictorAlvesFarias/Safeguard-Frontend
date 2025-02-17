import React from "react"
import { componentSelector } from "../utils/helpers/component-selector"

const contentVariations = {
    default: (props: React.HTMLAttributes<HTMLDivElement>) =>
        <div {...props} className="bg-fort rounded-lg m-1 items-center justify-center flex-1 flex-col md:flex-rol overflow-auto bg-zinc-900  relative" />
}

const SidebarContent = componentSelector<keyof typeof contentVariations, React.HTMLAttributes<HTMLDivElement>>(contentVariations)

export default SidebarContent
