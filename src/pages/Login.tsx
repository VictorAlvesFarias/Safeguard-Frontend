import React, { useContext, useState } from 'react'
import {Link } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'
import { zodResolver } from "@hookform/resolvers/zod"
import InputDefault from '../styled-components/InputDefault'
import ButtonDefault from '../styled-components/ButtonDefault'
import Form from '../containers/Form'

function Login() {

  const [loginLoading, setLoginLoding] = useState(false)

  const formSchema = z.object({
    accessKey: z.string().nonempty("Campo Obrigatório").email("E-Mail Inválido"),
    password: z.string().nonempty("Campo Obrigatório")
  })

  const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    }
  );

  const { signIn } = useContext(AuthContext)

  async function handleSingIn(data: any) {
    setLoginLoding(true)
    await signIn(data)
      .then(() => {
        setLoginLoding(false)
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
              Bem vindo de volta
            </h1>
            <Form submit={handleSubmit(handleSingIn)} className={'flex flex-col gap-3'}>
                <InputDefault register={register('accessKey')} errors={errors.accessKey} label={'E-mail'}/>
                <InputDefault register={register('password')} errors={errors.password} label={'Senha'}/>
                <ButtonDefault loading={loginLoading} >Entrar</ButtonDefault>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se</Link>
                </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
