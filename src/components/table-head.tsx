import React from "react"
import { componentSelector } from "../utils/helpers/component-selector"

const headVariations = {
    default: (props: React.HTMLAttributes<HTMLHeadElement>) =>
        <thead {...props} className="min-w-full divide-b divide-opacity-10 border-b-2 border-zinc-500 " />,
    sticky: (props: React.HTMLAttributes<HTMLHeadElement>) =>
        <thead {...props} className="min-w-full divide-b divide-opacity-10  sticky top-0 " />
}

const TableHead = componentSelector<keyof typeof headVariations, React.HTMLAttributes<HTMLHeadElement>>(headVariations)

export default TableHead