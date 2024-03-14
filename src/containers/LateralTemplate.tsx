import React from 'react'

function LateralTemplate({children,className}) {
  return (
    <div className={'flex md:flex-row flex-col  w-screen h-screen fixed top-0 left-0 '+ className}>
        {children}
    </div>
  )
}

export default LateralTemplate