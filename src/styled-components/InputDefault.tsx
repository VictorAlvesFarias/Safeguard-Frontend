import React from 'react'
import InputRoot from '../components/InputRoot'
import Input from '../components/Input'
import ErrorSpan from '../components/ErrorSpan'
import Label from '../components/Label'

function InputDefault({register,errors,label,readonly}:any) {
  return (
    <InputRoot className={"flex-1"} >
        <Label className="text-black text-sm" >{label}</Label>
        <Input className={"rounded w-full border border-zinc-300 h-8 text-black indent-1 p-1 "} readonly={readonly} register={register} />
        <ErrorSpan error={errors}/>
    </InputRoot>
  )
}

export default InputDefault