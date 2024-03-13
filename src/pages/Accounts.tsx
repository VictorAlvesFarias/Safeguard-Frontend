import React  from 'react'
import { useSelector } from 'react-redux';
import lockIcon from '../assets/lock.svg'
import { Link } from 'react-router-dom';

function Accounts() 
{
  const accounts:any = useSelector(({account}:any) => account.value)

  return (
    <div className='bg-fort w-full h-full flex-col overflow-auto rounded'>
    <div className=' flex-wrap flex items-end p-3 pl-6 py-6 gap-6 '>
      <div className='w-28 h-28 bg-tertiary rounded center'>
        <img className='w-16 min-h-16' src={lockIcon}></img>
      </div>
      <div className='gap-6 flex-col'>
        <h1 className='font-bold font- text-white text-3xl font-sans '>Minhas Contas</h1>
        <p className='text-lg'>Dominons: {}</p>
      </div>
    </div>
    <div className='bg-fort h-full px-6 pt-12'>
      <Link className='cursor-pointer text-center center w-fit  bg-white bg-opacity-5 border border-zinc-400 p-1.5 px-3 rounded-full top-0 left-0 ' to={'create'}>Criar Dominio</Link>
      <div className='grid sm:grid-cols-2 xl:grid-cols-3 h-fit gap-3 mt-12'>

      </div>
    </div>
  </div>
  )
}

export default Accounts