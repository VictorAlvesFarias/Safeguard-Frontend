import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Form from '../containers/Form';
import InputDefault from '../styled-components/InputDefault'
import ButtonDefault from '../styled-components/ButtonDefault'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DropdownDefault from '../styled-components/DropdownDefault';
import { EmailService } from '../services/EmailService';

export default function ManagerEmail() 
{
  const back:any = -1
  const emailService = new EmailService()
  const [loading, setLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const domains = useSelector(({ domain }: any) => domain.value).map(i => {
    return { ...i, value: i.id, label: i.signature }
  })
  const schema = z.object({
    username: z.string().nonempty('Campo obrigatório'),
    name: z.string().nonempty('Campo obrigatório'),
    providerId: z.string().nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    phone: z.string().nonempty('Campo obrigatório')
  })
  const { watch, register, handleSubmit, formState: { errors }, setValue } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );
  const navigate = useNavigate()

  async function handleAddDomain(data) {
    setLoading(true)
    await emailService.Add(data)
      .then(r => {
        setLoading(false)
        navigate(-1)
      })
      .catch(r => {
        setLoading(false)
      }
      )
  }

  useEffect(() => {
    setCurrentImage(domains.filter(x => x.id == watch("providerId"))[0]?.image)
  }, [watch("providerId")])

  return (
    <div className='bg-fort w-full h-full overflow-auto relative'>
      <Link className='cursor-pointer absolute m-3 bg-white bg-opacity-5 border border-zinc-400 p-1.5 px-3 rounded-full top-0 left-0 ' to={back}>Voltar</Link>
      <div className='flex gap-3 w-full  my-28 h-full rounded items-center justify-center  flex-col p-3  center '>
        <div className='w-48 h-48 bg-tertiary rounded center'>
          {currentImage && <img className='w-16 min-h-16' src={currentImage}></img>}
        </div>
        <div className=' w-full flex-1 rounded center '>
          <Form submit={handleSubmit(handleAddDomain)} className='flex flex-col gap-3 center w-80'>
            <InputDefault register={register('name')} errors={errors.name} label={'Name'} />
            <InputDefault register={register('username')} errors={errors.username} label={'User'} />
            <DropdownDefault
              control={"providerId"}
              setValue={setValue}
              options={domains}
              label={"Dominios"}
              register={register("providerId")}
              errors={errors.providerId}
            />
            <InputDefault register={register('password')} errors={errors.password} label={'Senha'} />
            <InputDefault register={register('phone')} errors={errors.phone} label={'Telefone'} />
            <div className='mt-6'>
              <ButtonDefault loading={loading} >Adicionar</ButtonDefault>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}