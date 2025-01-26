import React from "react"
import FormContainer, { IFormContainerProps } from '../base-components/form'
import { useSelector } from "../utils/hooks/selector-hooks"

const formVariation = {
    default: (props: IFormContainerProps) =>
        <FormContainer {...props} className='flex flex-col gap-6 p-6' />,
    card: (props: IFormContainerProps) =>
        <FormContainer {...props} className='flex flex-col gap-3 w-full' />,
    "default-full": (props: IFormContainerProps) =>
        <FormContainer {...props} className='flex flex-col gap-3 h-full w-full p-6' />,
    "default-full-center": (props: IFormContainerProps) =>
        <FormContainer {...props} className='flex flex-col gap-3 h-full w-full p-6 center' />,
    row: (props: IFormContainerProps) =>
        <FormContainer {...props} className='flex gap-3 p-6' />
}

const Form = useSelector<keyof typeof formVariation, IFormContainerProps>(formVariation)

export default Form