import React, { useEffect, useState } from 'react'
import Input from './Input';

function Dropdown({ disable, register, options, setValue, control, className, value }) {
    const [drop, setDrop] = useState(false)
    const [selected, setSelected] = useState("")

    function handleClose(i) {
        if (i !== null) {
            setValue(control, String(i.value), {
                shouldValidate: true
            })
            setSelected(i.label)
            setDrop(false)
        }
        else {
            setDrop(false)
        }
    }

    useEffect(() => {
        setSelected(value?.label)
    }, [])


    return (
        <  >
            <div className='w-full relative '>
                <div onClick={disable ? () => null : () => setDrop(!drop)} className={'cursor-pointer h-10 w-full ' + className.input}>
                    {selected}
                </div>
                <Input className={"rounded w-full border border-zinc-300 hidden text-black indent-1 p-1 "} readonly={true} register={register} />
                {drop && <div className={'absolute w-full h-full z-50 ' + className.drop}>
                    <div className={'w-full flex flex-col ' + className.control}>
                        {options.length > 0 ? options.map(i =>
                            <span onClick={() => handleClose(i)} className={'w-full h-full ' + className.option} >
                                {i.label}
                            </span>
                        ) : "Vazio"}
                    </div>
                </div>}
            </div>
            {drop && <div onClick={handleClose} className='absolute w-full top-0 left-0 h-full z-10'>

            </div>}
        </>
    )
}

export default Dropdown