import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { z } from 'zod'
import addIcon from '../assets/add.svg'
import Form from '../containers/Form';
import InputDefault from '../styled-components/InputDefault'
import ButtonDefault from '../styled-components/ButtonDefault'
import { DomainService } from '../services/DomainService';
import { useDispatch, useSelector } from 'react-redux';
import { domainActions } from '../slices/DomainSlice';

function Domains() {

  const domainService = new DomainService()
  const [loading, setLoading] = useState(false)
  const domains = useSelector(({domain}:any) => domain.value)
  const dispatch = useDispatch()
  const schema = z.object({
    name: z.string().nonempty('Campo obrigatório'),
    description: z.string().nonempty('Campo obrigatório'),
    signature: z.string().nonempty('Campo obrigatório')
  })
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>(
    {
      resolver: zodResolver(schema),
    }
  );

  async function handleAddDomain(data) {
    console.log(domainActions)
    setLoading(true)
    await domainService.Add(data)
    .then(r=>{
      setLoading(false)
      handleGetDomains()
    })
    .catch(r=>{
      setLoading(false)
  })}

  async function handleRemoveDomain(id) {
    await domainService.Remove(id)
    .then(r=>{
      handleGetDomains()
    })
    .catch(r=>{
  })}

  async function handleGetDomains() {
    domainService.GetAll()
    .then(r=>{
      setLoading(false)
      dispatch(domainActions.set(r))
    })
    .catch(r=>{
      setLoading(false)
    })
  }

  useEffect(() => {
    handleGetDomains()
  }, [])

  return (
    <div className='flex gap-3 w-full h-full rounded'>
        <div className='col h-full gap-3 w-full max-w-xs'>
          <div className='bg-zinc-100 w-full h-full rounded p-6'>
            <Form submit={handleSubmit(handleAddDomain)} className={'flex flex-col gap-3'}>
                <InputDefault register={register('name')} errors={errors.name} label={'Name'}/>
                <InputDefault register={register('signature')} errors={errors.signature} label={'Domain'}/>
                <InputDefault register={register('description')} errors={errors.description} label={'Description'}/>
                <ButtonDefault loading={loading} >Adicionar</ButtonDefault>
            </Form>
          </div>
          <div className='bg-zinc-100 w-full h-full cursor-pointer rounded p-6 center'>
            <img src={addIcon} className='w-10 h-10' alt="" />
          </div>
        </div>
        <div className='w-full bg-zinc-100 rounded grid md:grid-cols-2 xl:grid-cols-3 gap-3 p-3 overflow-auto'>
          {domains.map((item)=>
              <div className='bg-zinc-200 overflow-hidden rounded flex-col relative flex-1 h-48 flex items-center transition-all justify-center'>
                <span onClick={()=>handleRemoveDomain(item.id)}>X</span>
                {item.name}
              </div>  
          )}
        </div>
    </div>
  )
}

export default Domains