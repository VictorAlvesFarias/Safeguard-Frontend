import React from "react"
import { useSelector } from "../utils/hooks/selector-hooks"
import { IContentContainer } from "../base-components/content"

const ContentVariations = {
  default: (props: IContentContainer) =>
    <div children={props.children}  aria-hidden={props.visible ? "true" : "false"} className='text-white h-full flex flex-col w-full relative  aria-hidden:hidden overflow-auto' />
}

const Content = useSelector<keyof typeof ContentVariations, IContentContainer>(ContentVariations)

export default Content