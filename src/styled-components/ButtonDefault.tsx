import React from 'react'
import Button from '../components/Button'
import Loading from '../components/Loading'

function ButtonDefault({loading,children}) {

  return (
    <Button
        className="bg-blue-400 w-full flex items-center justify-center rounded text-white p-1 hover:shadow-md transition-all"
        loading={loading}
        loadingComponent={
        <Loading visible={true} className={"w-7 h-7"}/>}
    >
        {children}
    </Button>
  )
}

export default ButtonDefault