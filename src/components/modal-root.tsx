import React from "react"
import ModalRootContainer, { IModalRootContainerProps } from "../base-components/modal-root"
import { componentSelector } from "../utils/helpers/component-selector"

const modalRootVariations = {
    default: (props: IModalRootContainerProps) =>
        <ModalRootContainer {...props} className='bg-opacity-35 bg-black center flex p-10' />
}

const ModalRoot = componentSelector<keyof typeof modalRootVariations,IModalRootContainerProps>(modalRootVariations)

export default ModalRoot