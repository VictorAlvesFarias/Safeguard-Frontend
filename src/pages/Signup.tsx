import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupService } from './../services/SignupService';
import Form from '../containers/Form'
import InputDefault from '../styled-components/InputDefault'
import ButtonDefault from '../styled-components/ButtonDefault'

function Signup() {

  const [loginLoading, setLoginLoding] = useState(false)
  const [signUpSuccefull, setSignUpSuccefull] = useState(false)
  const signupService = new SignupService()
  const formSchema = z.object({
    name: z.string().nonempty("Campo Obrigatório"),
    email: z.string().nonempty("Campo Obrigatório").email("E-mail Inválido"),
    password: z.string().nonempty("Campo Obrigatório"),
    passwordConfirm: z.string().nonempty("Campo Obrigatório")
  })
  const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  function handleSingup(data) {
    setLoginLoding(true)
    signupService.Signup(Object.assign(data,{username:data.email.split("@").join(".")}))
      .then(() => {
        setLoginLoding(false)
        setSignUpSuccefull(true)
      })
      .catch(() => {
        setLoginLoding(false)
      })
  }

  return (
    <section className=" h-screen item">
      <div className="flex flex-col items-center h-full justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold">
          Safeguard
        </a>
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl leading-tight tracking-tight md:text-2xl">
              Cadastre-se
            </h1>
            <Form submit={handleSubmit(handleSingup)} className={'flex flex-col gap-3'}>
              <InputDefault register={register('name')} errors={errors.name} label={'Nome'} />
              <InputDefault register={register('email')} errors={errors.email} label={'E-mail'} />
              <InputDefault register={register('password')} errors={errors.password} label={'Senha'} />
              <InputDefault register={register('passwordConfirm')} errors={errors.passwordConfirm} label={'Confirmar Senha'} />
              <ButtonDefault loading={loginLoading} >Cadastre-se</ButtonDefault>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Entrar</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup