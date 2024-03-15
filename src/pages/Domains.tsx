import { AtSign } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonDefault from '../styled-components/ButtonDefault';

function Domains() 
{
  const domains = useSelector(({domain}:any) => domain.value)

  return (
    <div className='bg-fort w-full h-full flex-col overflow-auto rounded'>
      <div className=' flex-wrap flex items-end p-3 pl-6 py-6 gap-6 '>
        <div className='w-28 h-28 bg-tertiary rounded center'>
          <AtSign className='w-12 h-12'/>
        </div>
        <div className='gap-6 flex-col'>
          <h1 className='font-bold font- text-white text-3xl font-sans '>Meus Provedores de E-mail</h1>
          <p className='text-lg'>Dominios: {domains.length}</p>
        </div>
      </div>
      <div className='bg-fort h-full px-6 pt-12'>
        <Link className='bg-violet-600 text-zinc-900 font-bold w-fit p-2 px-12 flex items-center justify-center rounded-full hover:shadow-md' to={'create'}>
          Adicionar
        </Link>
        <div className='grid sm:grid-cols-2 xl:grid-cols-3 h-fit gap-3 mt-12'>
          {domains.map((item)=>
              <div className='bg-tertiary overflow-hidden rounded flex-col h-48 flex relative items-center transition-all justify-center'>
                <div className='w-48 h-48 flex flex-col gap-3 rounded center'>
                  <img className='w-16 min-h-16' src={item.image}></img>
                  <p className='font-semibold'>
                    {item.name}
                  </p>
                </div>
              </div>  
          )}
        </div>
      </div>
    </div>
  )
}

export default Domains