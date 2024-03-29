import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Form from '../containers/Form';
import InputDefault from '../styled-components/InputDefault'
import ButtonDefault from '../styled-components/ButtonDefault'
import { useDispatch, useSelector } from 'react-redux';
import { accountActions } from '../slices/AccountSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DropdownDefault from '../styled-components/DropdownDefault'
import { AccountService } from '../services/AccountService'
import { config } from '../config';

export default function ManagerDomain() 
{
  //router
  let {id} = useParams()

  //states
  const [loading, setLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [screen, setScreen] = useState(false)

  //stored
  const emails = useSelector(({ email }: any) => email.value).map(i => {
    return { ...i, value: i.id, label: i.username + '@' + i.provider.signature }
  })
  const platforms = useSelector(({ platform }: any) => platform.value).map(i => {
    return { ...i, value: i.id, label: i.name }
  })
  const account = useSelector(({ account }: any) => account.value).filter(x=>{
    return x.id == id
  })[0]

  //navigate   
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //services
  const domaidnService = new AccountService()

  //forms
  const schema = z.object({
    name: z.string().nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório'),
    username: z.string().nonempty('Campo obrigatório'),
    phone: z.string().nonempty('Campo obrigatório'),
    platformId: z.string().nonempty('Campo obrigatório'),
    emailId: z.string().nonempty('Campo obrigatório'),
  })
  const { reset,watch, register, handleSubmit, formState: { errors }, setValue } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  //handle functions
  async function handleAddDomain(data) {
    setLoading(true)
    await domaidnService.Add(data)
      .then(r => {
        setLoading(false)
        handleGetDomains()
        navigate(-1)
      })
      .catch(r => {
        setLoading(false)
      }
      )
  }
  async function handleGetDomains() {
    await domaidnService.GetAll()
      .then((r: any) => {
        setLoading(false)
        dispatch(accountActions.set(r))
      })
      .catch(r => {
        setLoading(false)
      })
  }
  function handleSetDefaultForm() {
    reset({
      emailId:account.email.id,
      name:account.name,
      password:account.password,
      phone:account.phone,
      platformId:account.platform.id,
      username:account.username
    })
  }

  useEffect(() => {
    if(account!=null){
      handleSetDefaultForm()
    }
    setScreen(true)
  }, [account])
  

  return (
    <div className='bg-fort w-full h-full overflow-auto relative'>
      <Link className='cursor-pointer absolute m-6 bg-white bg-opacity-5 border border-zinc-400 p-1.5 px-3 rounded-full top-0 left-0 ' to={config.routerDomBack}>Voltar</Link>
      {
        screen&&
        <div className='flex gap-3 w-full  my-28 rounded items-center justify-center flex-col p-3  center '>
          <div className='w-48 h-48 min-h-48 bg-tertiary rounded center'>
            {currentImage && <img className='w-16 min-h-16' src={currentImage}></img>}
          </div>
          <div className=' w-full flex-1 rounded center '>
            <Form submit={handleSubmit(handleAddDomain)} className='flex flex-col gap-3 center w-80'>
              <DropdownDefault
                control={"emailId"}
                setValue={setValue}
                options={emails}
                label={"E-Mail"}
                register={register("emailId")}
                errors={errors.emailId}
                disable={false}
                value={watch("emailId")}
              />
              <DropdownDefault
                control={"platformId"}
                setValue={setValue}
                options={platforms}
                label={"Plataforma"}
                register={register("platformId")}
                errors={errors.platformId}
                disable={false}
                value={watch("platformId")}
              />
              <InputDefault
                register={register('name')}
                errors={errors.name}
                label={'Name'} />
              <InputDefault
                register={register('password')}
                errors={errors.password}
                label={'Senha'}
              />
              <InputDefault
                register={register('phone')}
                errors={errors.password}
                label={'Telefone'}
              />
              <InputDefault
                register={register('username')}
                errors={errors.password}
                label={'Username'}
              />
              <div className='mt-6'>
                <ButtonDefault loading={loading} >Adicionar</ButtonDefault>
              </div>
            </Form>
          </div>
        </div>
      }
    </div>
  )
}