import React from "react"
import { componentSelector } from "../utils/helpers/component-selector"
import { IContentContainer } from "../base-components/content"

const ContentVariations = {
  default: (props: IContentContainer) =>
    <div children={props.children}  aria-hidden={props.visible ? "true" : "false"} className='text-white h-full flex flex-col w-full relative  aria-hidden:hidden overflow-auto' />
}

const Content = componentSelector<keyof typeof ContentVariations, IContentContainer>(ContentVariations)

export default Content