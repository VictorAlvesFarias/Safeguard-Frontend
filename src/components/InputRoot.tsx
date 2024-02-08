import React from 'react'

function InputRoot({children, className}) {
  return (
    <div className={'flex-col flex text-zinc-200 '+className}>
        {children}
    </div>
  )
}

export default InputRoot