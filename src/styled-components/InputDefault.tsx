import React from 'react'
import InputRoot from '../components/InputRoot'
import Input from '../components/Input'
import ErrorSpan from '../components/ErrorSpan'
import Label from '../components/Label'

function InputDefault({register,errors,label,readonly}:any) {
  return (
    <InputRoot className={"w-full"} >
        <Label className="text-sm text-white font-semibold" >{label}</Label>
        <Input className={"transition-all rounded w-full border mt-1.5 bg-transparent text-zinc-200 border-zinc-400  p-2"} readonly={readonly} register={register} />
        <ErrorSpan error={errors}/>
    </InputRoot>
  )
}

export default InputDefault