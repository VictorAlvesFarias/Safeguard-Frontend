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

    <div className='flex  gap-3 w-full h-full   '>
      <div className='bg-zinc-100 p-3 w-full max-w-xs rounded'>
        <Form submit={handleSubmit(handleAddAccount)} className={'flex gap-3'}>
            <div className='w-full bg-zinc-100 rounded flex flex-col gap-3 p-3 overflow-auto'>
              <InputDefault register={register('name')} errors={errors.name} label={'Name'}/>
              <InputDefault register={register('username')} errors={errors.username} label={'User'}/>
              <Dropdown 
                control={"emailId"}
                setValue={setValue}
                options={emails}
                label={"Email"} 
                register={register("emailId")} 
                errors={errors.emailId}                 
              />
              <InputDefault register={register('password')} errors={errors.password} label={'Senha'}/>
              <InputDefault register={register('phone')} errors={errors.phone} label={'Telefone'}/> 
              <ButtonDefault loading={loading} >Adicionar</ButtonDefault>
            </div>
        </Form>
      </div>
      <div className='h-full w-full flex flex-col gap-3 bg-zinc-100 rounded p-3'>
          {accounts.map((item)=>
              <div className='bg-zinc-200 overflow-hidden rounded gap-3 p-3 relative  h-fit flex items-center transition-all'>
                <button className=' top-0 right-0  m-3 absolute w-7 h-7 text-center text-white bg-red-400 rounded' onClick={()=>(item.id)}>
                  X
                </button>
                <div className='w-14 h-14 bg-zinc-500 rounded'>

                </div>
                <p>
                  E-Mail: {item.username}@{item.provider}
                </p>
              </div>  
          )}
      </div>
    </div>
  )
}

export default Accounts