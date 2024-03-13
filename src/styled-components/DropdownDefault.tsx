import React from 'react'
import InputRoot from '../components/InputRoot'
import Label from '../components/Label'
import ErrorSpan from '../components/ErrorSpan'
import Dropdown from '../components/Dropdown';

function DropdownDefault({label,errors,control,setValue,options,register}) {

  return (
    <InputRoot className={"w-full"} >
        <Label className="text-sm text-white font-semibold" >{label}</Label>
        <Dropdown 
            register={register} 
            options={options} 
            setValue={setValue} 
            control={control} 
            className={{
                input:"transition-all h-10 rounded w-full border mt-1.5 bg-transparent text-zinc-200 border-zinc-400  p-2",
                drop:"bg-primary",
                control:"bg-fort border mt-1.5 text-zinc-200 border-zinc-400  p-2",
                option:"p-1 h-8 items-center flex text-zinc-200 rounded hover:bg-zinc-950 hover:bg-opacity-40"
            }}/>
        <ErrorSpan error={errors}/>
    </InputRoot>
  )
}

export default DropdownDefault