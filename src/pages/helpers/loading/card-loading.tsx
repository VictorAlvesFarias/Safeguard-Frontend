
import React from "react"
import Loading from "./loading"
import If from "../../../base-components/if"

interface LoadingPageProps {
  loading: boolean
  children?: React.ReactNode
}

function CardLoading(props: LoadingPageProps) {
  return (
    <div className="relative w-full flex-1">
      <If conditional={props.loading}>
        <div className='absolute w-full h-full text-white'>
          <Loading loading={true}></Loading>
        </div>
      </If>
      <div aria-hidden={props.loading} className='aria-hidden:opacity-0'>
        {props?.children}
      </div>
    </div>
  )
}

export default CardLoading