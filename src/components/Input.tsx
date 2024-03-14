import React from 'react'

function Input({ register, className, readonly, placeholder }: any) {
  return (
    <input 
      {...register} 
      type='text' 
      readOnly={readonly}
      autoComplete='off'
      placeholder={placeholder} 
      className={className} />
  )
}

export default Input