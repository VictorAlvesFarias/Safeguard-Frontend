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
import { Link } from 'react-router-dom'
import lockIcon from '../assets/lock.svg'

function Emails() {

  const [loading, setLoading] = useState(false)
  const emailService = new EmailService()
  const emails = useSelector(({email}:any) => email.value)
  const dispatch = useDispatch()
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
    <div className='bg-fort w-full h-full flex-col overflow-auto rounded'>
      <div className='min-h-60 flex-wrap flex items-end p-6 pl- pb-6 gap-6 '>
        <div className='w-28 h-28 bg-tertiary rounded center'>
          <img className='w-16 min-h-16' src={lockIcon}></img>
        </div>
        <div className='gap-6 flex-col'>
          <h1 className='font-bold font- text-white text-3xl font-sans '>Meus E-Mails</h1>
          <p className='text-lg'>Emails: {emails.length}</p>
        </div>
      </div>
      <div className='bg-fort h-full px-6 pt-12'>
        <Link className='cursor-pointer text-center center w-fit  bg-white bg-opacity-5 border border-zinc-400 p-1.5 px-3 rounded-full top-0 left-0 ' to={'create'}>Criar Email</Link>
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