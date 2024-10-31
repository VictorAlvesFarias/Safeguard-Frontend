import React from 'react'
import { LoaderCircle } from 'lucide-react';

interface ILoadingContainerProps {
  className: string
}

function LoadingContainer(props: ILoadingContainerProps) {
  return (
    <LoaderCircle className={props.className} />
  )
}

export default LoadingContainer

export {
  ILoadingContainerProps
}