import React from 'react'
import InputRoot from '../components/InputRoot'
import Input from '../components/Input'
import { Search } from 'lucide-react'

function SearchDefault({register,errors,label,readonly, placeholder}:any) {
  return (
    <InputRoot className={"w-full"} >
      <div className='rounded-full bg-primary-solid flex items-center '>
        <Search className='ml-4 w-7 h-7' />
        <Input 
            className={"rounded-full bg-primary-solid indent-3 w-full p-2"} 
            placeholder={placeholder} 
            readonly={readonly} 
            register={register}
          />
      </div>
    </InputRoot>
  )
}

export default SearchDefault