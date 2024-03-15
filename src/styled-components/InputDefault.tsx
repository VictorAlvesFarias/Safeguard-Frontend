import React from 'react'
import InputRoot from '../components/InputRoot'
import Input from '../components/Input'
import ErrorSpan from '../components/ErrorSpan'
import Label from '../components/Label'

function InputDefault({register,errors,label,readonly, disable}:any) {
  return (
    <InputRoot className={"w-full"} >
        <Label className="text-sm text-white font-semibold" >{label}</Label>
        <Input 
          className={"transition-all w-full indent-3 mt-1.5 text-zinc-200 p-2 "+(!disable?"border border-zinc-400 bg-transparent rounded":"rounded-full bg-primary-solid")} 
          readonly={readonly} 
          register={register} 
          disable={disable}
        />
        <ErrorSpan error={errors}/>
    </InputRoot>
  )
}

export default InputDefault