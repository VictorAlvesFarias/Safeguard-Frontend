import React from "react"
import ModalRootContainer, { IModalRootContainerProps } from "../base-components/modal-root"
import { useSelector } from "../utils/hooks/selector-hooks"

const modalRootVariations = {
    default: (props: IModalRootContainerProps) =>
        <ModalRootContainer {...props} className='bg-opacity-35 bg-black center ' />
}

const ModalRoot = useSelector<keyof typeof modalRootVariations,IModalRootContainerProps>(modalRootVariations)

export default ModalRoot