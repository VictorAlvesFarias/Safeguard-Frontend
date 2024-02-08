import React, { useEffect, useState } from 'react'
import Form from '../containers/Form'
import InputDefault from '../styled-components/InputDefault'
import ButtonDefault from '../styled-components/ButtonDefault'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Dropdown from '../components/Dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { EmailService } from '../services/EmailService'
import {emailActions} from '../slices/EmailSlice'

function Emails() {

  const [loading, setLoading] = useState(false)
  const emailService = new EmailService()
  const emails = useSelector(({email}:any) => email.value)
  const dispatch = useDispatch()
  const domains = useSelector(({domain}:any) => domain.value).map(i=>{
    return  { value: i.id, label: i.signature }
  })
  const schema = z.object({
    username: z.string().nonempty('Campo obrigatório'),
    name: z.string().nonempty('Campo obrigatório'),
    providerId: z.string().nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    phone: z.string().nonempty('Campo obrigatório')
  })

  const {setValue, register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  async function handleAddEmail(data) {
    console.log(data)
    await emailService.Add(data)
    .then(r=>{
      setLoading(false)
      handleGetEmails()
    })
    .catch(r=>{
      setLoading(false)
    })
  }

  async function handleRemoveEmail(id) {
    await emailService.Remove(id)
    .then(r=>{
      handleGetEmails()
    })
    .catch(r=>{
  })}

  async function handleGetEmails() {
    emailService.GetAll()
    .then(r=>{
      setLoading(false)
      dispatch(emailActions.set(r))
    })
    .catch(r=>{
      setLoading(false)
    })
  }

  useEffect(() => {
    handleGetEmails()
  }, [])
  

  return (
    <div className='flex  gap-3 w-full h-full   '>
      <div className='bg-zinc-100 p-3 w-full max-w-xs rounded'>
        <Form submit={handleSubmit(handleAddEmail)} className={'flex gap-3'}>
            <div className='w-full bg-zinc-100 rounded flex flex-col gap-3 p-3 overflow-auto'>
              <InputDefault register={register('name')} errors={errors.name} label={'Name'}/>
              <InputDefault register={register('username')} errors={errors.username} label={'User'}/>
              <Dropdown 
                control={"providerId"}
                setValue={setValue}
                options={domains}
                label={"Dominios"} 
                register={register("providerId")} 
                errors={errors.providerId}                 
              />
              <InputDefault register={register('password')} errors={errors.password} label={'Senha'}/>
              <InputDefault register={register('phone')} errors={errors.phone} label={'Telefone'}/> 
              <ButtonDefault loading={loading} >Adicionar</ButtonDefault>
            </div>
        </Form>
      </div>
      <div className='h-full w-full bg-zinc-100 rounded'>
          {emails.map((item)=>
              <div className='bg-zinc-200 overflow-hidden rounded flex-col relative flex-1 h-48 flex items-center transition-all justify-center'>
                <span onClick={()=>handleRemoveEmail(item.id)}>X</span>
                {item.name}
              </div>  
          )}
      </div>
    </div>
  )
}

export default Emails