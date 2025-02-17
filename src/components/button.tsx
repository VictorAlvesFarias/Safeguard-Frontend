import React from "react"
import ButtonContainer, { IButtonContainerProps } from '../base-components/button'
import { componentSelector } from "../utils/helpers/component-selector"
import { LucideLoaderCircle } from "lucide-react"

const buttonVariations = {
  default: (props: IButtonContainerProps, ref: any) => {
    return (
      <ButtonContainer
        {...props}
        ref={ref}
        loadingComponent={
          <LucideLoaderCircle className='w-6 h-6 rotating-div' />
        }
        className='bg-main-violet-500 text-white text-nowrap px-9 w-fit rounded-full shadow hover:bg-opacity-70 transition-all h-11 p-1  font-semibold flex justify-center items-center' />
    )
  },
  "default-full": (props: IButtonContainerProps, ref: any) => {
    return (
      <ButtonContainer
        {...props}
        ref={ref}
        loadingComponent={
          <LucideLoaderCircle className='w-6 h-6 rotating-div' />
        }
        className='bg-main-violet-500 aria-disabled:bg-zinc-600 text-white text-nowrap px-9 w-full rounded-full shadow hover:bg-opacity-70 transition-all h-11 p-1  font-semibold flex justify-center items-center' />
    )
  },
  red: (props: IButtonContainerProps, ref: any) => {
    return (
      <ButtonContainer
        {...props}
        ref={ref}
        loadingComponent={
          <LucideLoaderCircle className='w-6 h-6 rotating-div' />
        }
        className='bg-red-500 text-white px-2 w-full shadow hover:bg-opacity-70 rounded-full transition-all h-11 p-1 font-semibold flex justify-center items-center' />
    )
  },
  href: (props: IButtonContainerProps, ref: any) => {
    return (
      <ButtonContainer
        {...props}
        ref={ref}
        loadingComponent={
          <LucideLoaderCircle className='w-6 h-6 rotating-div' />
        }
        className='border-violet-500 p-2 px-3 rounded-full border text-sm bg-violet-500 bg-opacity-20 w-fit text-violet-500 hover:bg-opacity-30 transition-all' />
    )
  }
}

const Button = componentSelector<keyof typeof buttonVariations, IButtonContainerProps>(buttonVariations)

export default Button
