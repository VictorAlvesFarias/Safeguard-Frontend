import { Mail } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Emails() {

  const emails = useSelector(({email}:any) => email.value)

  return (
    <div className='bg-fort w-full h-full flex-col overflow-auto rounded'>
      <div className='min-h-60 flex-wrap flex items-end p-6 pl- pb-6 gap-6 '>
        <div className='w-28 h-28 bg-tertiary rounded center'>
          <Mail className='w-12 h-12' />
        </div>
        <div className='gap-6 flex-col'>
          <h1 className='font-bold font- text-white text-3xl font-sans '>Meus E-Mails</h1>
          <p className='text-lg'>Emails: {emails.length}</p>
        </div>
      </div>
      <div className='bg-fort h-full px-6 pt-12'>
        <Link className='bg-violet-600 text-zinc-900 font-bold w-fit p-2 px-12 flex items-center justify-center rounded-full hover:shadow-md' to={'create'}>
          Adicionar
        </Link>
        <div className='flex flex-col gap-3 mt-12'>
          {emails.map((item)=>
            <div className='flex mb-3 gap-3 items-center'>
              <div className='w-12 h-12 p-3 bg-tertiary rounded center'>
                <img className='' src={item.provider.image}></img>
              </div>
              <div className='flex flex-wrap flex-col overflow-hidden flex-1 '>
                <p className='whitespace-nowrap'>
                  {item.name}
                </p>
                <p className='whitespace-nowrap'>
                  {item.username}@{item.provider.signature}
                </p>
              </div>
            </div>  
          )}
        </div>
      </div>
    </div>
  )
}

export default Emails