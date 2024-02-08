import React from 'react'

function LateralTemplate({children,className}) {
  return (
    <div className={'flex flex-row w-screen h-screen fixed top-0 left-0 '+ className}>
        {children}
    </div>
  )
}

export default LateralTemplate