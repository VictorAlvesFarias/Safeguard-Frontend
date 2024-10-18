import React from "react"
import { useSelector } from "../utils/hooks/selector-hooks"

const headVariations = {
    default: (props: React.HTMLAttributes<HTMLHeadElement>) =>
        <thead {...props} className="min-w-full divide-b divide-opacity-10 border-b-2 border-zinc-500 " />,
    sticky: (props: React.HTMLAttributes<HTMLHeadElement>) =>
        <thead {...props} className="min-w-full divide-b divide-opacity-10  sticky top-0 " />
}

const TableHead = useSelector<keyof typeof headVariations, React.HTMLAttributes<HTMLHeadElement>>(headVariations)

export default TableHead