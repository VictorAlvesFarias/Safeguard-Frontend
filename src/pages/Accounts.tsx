import React, { useEffect, useState } from 'react'
import Form from '../containers/Form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputDefault from '../styled-components/InputDefault';
import ButtonDefault from '../styled-components/ButtonDefault';
import { z } from 'zod';
import Dropdown from '../components/Dropdown';
import { AccountService } from '../services/AccountService';
import { accountActions } from '../slices/AccountSlice';

import lockIcon from '../assets/lock.svg'
import { Link } from 'react-router-dom';

function Accounts() {
  const [loading, setLoading] = useState(false)
  const accountService = new AccountService()
  const dispatch = useDispatch()
  const accounts:any = useSelector(({account}:any) => account.value)
  const schema = z.object({
    name: z.string().nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    username: z.string().nonempty('Campo obrigatório'),
    phone: z.string().nonempty('Campo obrigatório'),
    emailId: z.string().nonempty('Campo obrigatório')
  })
  const {setValue, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );
  const emails = useSelector(({email}:any) => email.value).map(i=>{
    console.log(i)
    return  { value: i.id, label: i.username+"@"+i.provider }
  })
  

  async function handleAddAccount(data) {
    await accountService.Add(data)
    .then(r=>{
      setLoading(false)
      handleGetAccounts()
    })
    .catch(r=>{
      console.log(r)
      setLoading(false)
    })
  }

  
  async function handleGetAccounts() {
    await accountService.GetAll()
    .then(r=>{
      console.log(r)
      setLoading(false)
      dispatch(accountActions.set(r))
    })
    .catch(r=>{
      console.log(r)
      setLoading(false)
    })
  }

  useEffect(() => {
    handleGetAccounts()
  }, [])
  

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