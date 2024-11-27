import { useSelector } from "../utils/hooks/selector-hooks"
import React from "react"

const spanVariations = {
  default: (props: React.HTMLAttributes<HTMLSpanElement>) =>
    <span children={props.children} className='mb-1 font-semibold px-1' />,
  error: (props: React.HTMLAttributes<HTMLSpanElement>) =>
    <span
      children={props.children}
      className='text-red-400' />,
  "button-default-full": (props: React.HTMLAttributes<HTMLSpanElement>) =>
    <span
      {...props}
      children={props.children}
      className='bg-main-violet-500 text-white text-nowrap px-9 w-full rounded-full shadow hover:bg-opacity-70 transition-all h-9 p-1  font-semibold flex justify-center items-center' />
}

const Span = useSelector<keyof typeof spanVariations, React.HTMLAttributes<HTMLSpanElement>>(spanVariations)

export default Span