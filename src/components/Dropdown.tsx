import React, { useState } from 'react'
import Select from 'react-select'
import Label from './Label';
import InputRoot from './InputRoot';
import ErrorSpan from './ErrorSpan';
import Control from 'react-select/dist/declarations/src/components/Control';
import Input from './Input';
import InputDefault from '../styled-components/InputDefault';

function Dropdown({ register, options, label, errors, setValue, control }) {

    const [drop,setDrop] = useState(false)
    const [selected,setSelected] = useState("")

    function handleClose(i) {
        if(i !==null){
            setValue(control,String(i.value),{
                shouldValidate: true
            })
            setSelected(i.label)
            setDrop(false)
        }
        else {
            setDrop(false)
        }
    }

    function handleOpen() {
        setDrop(true)
    }

    return (
        <InputRoot className={"flex-1"} >
            <Label className="text-black text-sm " >{label}</Label>
            <div className='w-full relative z-20'>
                <InputRoot className={"w-full"} >
                    <div onClick={()=>setDrop(!drop)} className='rounded w-full cursor-pointer border bg-zinc-50 border-zinc-300 h-8 text-black indent-1 p-1  '>
                        {selected}
                    </div>
                    <Input className={"rounded w-full border border-zinc-300 hidden text-black indent-1 p-1 "} readonly={true} register={register} />
                </InputRoot>
                {drop&&<div className='absolute mt-1 rounded top-full right-0 bg-zinc-50 border-zinc-300 border w-full p-1 '>
                    <div className='w-full h-full flex flex-col gap-2 '>
                        {options.length>0? options.map(i=>
                            <span onClick={()=>handleClose(i)} className='p-1 h-8 items-center flex text-zinc-700 rounded hover:bg-zinc-200' >
                                {i.label}
                            </span>
                        ):"Vazio"}
                    </div>
                </div>}
            </div>
            {drop&&<div onClick={handleClose} className='absolute w-full top-0 left-0 h-full z-10'>

            </div>}
            
            <ErrorSpan error={errors}/>
        </InputRoot>
    )
}

export default Dropdown