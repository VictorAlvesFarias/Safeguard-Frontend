import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import Form from '../containers/Form';
import InputDefault from '../styled-components/InputDefault'
import ButtonDefault from '../styled-components/ButtonDefault'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PlatformService } from '../services/PlatformService';
import { useDispatch, useSelector } from 'react-redux';
import { domainActions } from '../slices/DomainSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function ManagerPlatforms() {

  const back:any = -1
  const platformService = new PlatformService()
  const [loading, setLoading] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const dispatch = useDispatch()
  const schema = z.object({
    name: z.string().nonempty('Campo obrigatório'),
    description: z.string().nonempty('Campo obrigatório'),
    image: z.string().nonempty('Campo obrigatório'),
  })
  const { register, handleSubmit, formState: { errors },setValue} = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );
  const navigate  = useNavigate()

  async function handleAddDomain(data) {
    setLoading(true)
    await platformService.Add(data)
    .then(r=>{
      setLoading(false)
      handleGetDomains()
      navigate(-1)
    })
    .catch(r=>{
      setLoading(false)
    }
  )}

  async function handleGetDomains() {
    await platformService.GetAll()
    .then((r:any)=>{
      setLoading(false)
      dispatch(domainActions.set(r))
    })
    .catch(r=>{
      setLoading(false)
    })
  }

  async function handleFile(image:any) {
    const file = image.target.files[0];
    const reader = new FileReader();  
  
    reader.readAsDataURL(file);
    reader.onload = function(event:any) {
      setValue('image',event.target.result)
      setCurrentImage(event.target.result)
    };
  }

  return (
    <div className='bg-fort w-full h-full relative overflow-auto'>
      <Link className='cursor-pointer absolute m-3 bg-white bg-opacity-5 border border-zinc-400 p-1.5 px-3 rounded-full top-0 left-0 ' to={back}>Voltar</Link>
      <div className='flex gap-3 w-full  my-28  rounded items-center justify-center  flex-col p-3  center '>
        <div className='w-48 h-48 bg-tertiary rounded center'>
          {currentImage&&<img className='w-16 min-h-16' src={currentImage}></img>}
        </div>
        <label htmlFor="providerImage" className='cursor-pointer mt-3 bg-white bg-opacity-5 border border-zinc-400 p-1.5 px-3 rounded-full'>
          Selecionar
          <input className="hidden" type="file" onChange={handleFile} id="providerImage" />
        </label>
        <div className=' w-full flex-1 rounded center '>
          <Form submit={handleSubmit(handleAddDomain)} className='flex flex-col gap-3 center w-80'>
              <InputDefault register={register('name')} errors={errors.name} label={'Name'}/>
              <InputDefault register={register('description')} errors={errors.description} label={'Description'}/>
              <div className='mt-6'>
                <ButtonDefault loading={loading} >Adicionar</ButtonDefault>
              </div>
          </Form>
        </div>
      </div>
    </div>
  )
}