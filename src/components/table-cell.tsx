import React from "react"
import { componentSelector } from "../utils/helpers/component-selector"

const headVariations = {
  default: (props: React.HTMLAttributes<HTMLTableCellElement>) =>
    <td {...props} className="" />,
  head: (props: React.HTMLAttributes<HTMLTableCellElement>) =>
    <th {...props} className="px-6 py-3 text-start text-sm text-gray-400 font-bold" />,
  "head-full": (props: React.HTMLAttributes<HTMLTableCellElement>) =>
    <th {...props} className="px-6 py-3 text-start w-full text-sm text-gray-400 font-bold" />,
  body: (props: React.HTMLAttributes<HTMLTableCellElement>) =>
    <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-white" />,
  "body-end": (props: React.HTMLAttributes<HTMLTableCellElement>) =>
    <td {...props} className="px-6 py-4 whitespace-nowrap text-sm text-white flex justify-end" />
}

const TableCell = componentSelector<keyof typeof headVariations, React.HTMLAttributes<HTMLTableCellElement>>(headVariations)

export default TableCell