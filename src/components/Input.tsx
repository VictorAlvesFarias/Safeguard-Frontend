import React from 'react'

function Input({ register, className, readonly }: any) {
  return (
    <input {...register} type='text' readOnly={readonly} autoComplete='off' className={className} />
  )
}

export default Input