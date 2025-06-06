import React from "react"
import { componentSelector } from "../utils/helpers/component-selector"

const AccordionRootVariations = {
    default: (props: React.HTMLAttributes<HTMLDivElement>) =>
        <div {...props} className='flex-col flex ' />,
    full: (props: React.HTMLAttributes<HTMLDivElement>) =>
        <div {...props} className='flex-col flex w-full' />
}

const AccordionRoot = componentSelector<keyof typeof AccordionRootVariations, React.HTMLAttributes<HTMLDivElement>>(AccordionRootVariations)

export default AccordionRoot