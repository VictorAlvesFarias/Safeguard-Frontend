import React from 'react'
import Button from '../components/Button'
import Loading from '../components/Loading'

function ButtonDefault({loading,children,onClick}:any) {

  return (
    <Button
        className="bg-violet-600 text-zinc-900 font-bold w-fit p-2 px-12 flex items-center justify-center rounded-full hover:shadow-md transition-all"
        loading={loading}
        submit={onClick}
        loadingComponent={
        <Loading visible={true} className={"w-7 h-7"}/>}
    >
        {children}
    </Button>
  )
}

export default ButtonDefault