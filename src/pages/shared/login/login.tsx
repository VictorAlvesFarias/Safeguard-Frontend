import React, { useContext, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import { LoaderCircle, LockOpen, LucideCheck } from 'lucide-react'
import { AuthContext } from '../../../auth/auth-context'
import Form from '../../../components/form';
import Button from '../../../components/button';
import InputRoot from '../../../components/input-root'
import Span from '../../../components/span'
import Label from '../../../components/label'
import InputText from '../../../components/input-text'
import Section from '../../../components/section'
import Checkbox from '../../../components/checkbox'
import { useQuery } from '../../../utils/hooks/query-hooks'

interface LoginSchema {
  accessKey: string
  password: string
}

function Login() {
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("remember-me") === "true")
  const context = useContext(AuthContext)
  const [finished, setQueries] = useQuery(true)

  const loginSchema = z.object({
    accessKey: z.string().nonempty("Required"),
    password: z.string().nonempty("Required"),
  })

  const { register, control, formState, handleSubmit } = useForm<LoginSchema>(
    {
      resolver: zodResolver(loginSchema),
    }
  );

  function handleSignIn(data: any) {
    return setQueries(() => context.signIn(data))
  }

  function handleSetRememberMe() {
    setRememberMe(!rememberMe)
    localStorage.setItem("remember-me", String(!rememberMe))
  }

  return (
    <section className="min-h-screen flex-col text-white w-full flex items-center justify-center gap-6 bg-gradient-to-t from-main-black-800 to-main-black-900 p-3">
      <Section>
        <div className='flex items-center justify-center gap-6 flex-col'>
          <div className='flex gap-3 items-center mb-3'>
            <LockOpen className='w-9 h-9 text-main-violet-500' />
            <h1 className='font-semibold text-3xl '>Safeguard</h1>
          </div>
          <div className='flex flex-col bg-main-black-800 shadow-sm rounded sm:px-9 px-6 py-9 sm:w-fit w-full'>
            <Form onSubmit={handleSubmit(handleSignIn)}>
              <h1 className='font-semibold text-2xl'>Welcome</h1>
              <InputRoot>
                <Label>E-Mail</Label>
                <InputText placeholder='E-Mail' {...register('accessKey')} />
                <Span variation='error'>{formState.errors.accessKey?.message}</Span>
              </InputRoot>
              <InputRoot>
                <Label>Password</Label>
                <InputText placeholder='Password' {...register('password')} />
                <Span variation='error'>{formState.errors.password?.message}</Span>
              </InputRoot>
              <Button loadingComponent={<LoaderCircle className={"rotating-div"} />} variation='default-full' loading={!finished}>
                Login
              </Button>
              <InputRoot variation='checkbox'>
                <Checkbox data={""} value={rememberMe} onChange={handleSetRememberMe}>
                  <LucideCheck className='w-3 h-3' />
                </Checkbox>
                <Label variation='row'>Keep me logged in</Label>
              </InputRoot>
            </Form>
          </div>
          <div className='flex gap-1 text-sm flex-wrap text-zinc-500 font-semibold'>
            <p>Don't have an account?</p>
            <Link className='text-main-violet-500 font-semibold' to={"/signup"}>Sign up here</Link>
          </div>
        </div>
      </Section>
    </section>
  )
}

export default Login

export {
  LoginSchema
}
