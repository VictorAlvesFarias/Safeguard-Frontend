import React from 'react'

function Input({ register, className, readonly, placeholder,disable }: any) {
  return (
    <input 
      {...register} 
      type='text' 
      readOnly={readonly}
      autoComplete='off'
      placeholder={placeholder} 
      className={className}
      disabled = {disable}
    />
  )
}

export default Input