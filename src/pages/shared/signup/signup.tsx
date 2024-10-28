import React from 'react'
import { useContext, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from 'react-router-dom'
import { Check, LoaderCircle, LockOpen, LucideCheck, ShieldCheck } from 'lucide-react'
import { AuthContext } from '../../../auth/auth-context'
import Form from '../../../components/form';
import Button from '../../../components/button';
import InputRoot from '../../../components/input-root'
import Span from '../../../components/span'
import Label from '../../../components/label'
import InputText from '../../../components/input-text'
import Section from '../../../components/section'
import { signupService } from '../../../services/signup-service'
import { useQuery } from '../../../utils/hooks/query-hooks'
import LoadingContainer from '../../../base-components/loading'
import { USER_ROUTES } from '../../../config/routes-config'

interface SignupSchema {
  name: string
  username: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

function Signup() {
  const [finished, setQuerys] = useQuery(true)
  const [success, setSuccess] = useState(true)
  const navigate = useNavigate();

  const signupSchema = z.object({
    name: z.string().nonempty("Required"),
    username: z.string().nonempty("Required"),
    lastName: z.string().nonempty("Required"),
    email: z.string().nonempty("Required").email("E-Mail Inválido"),
    phone: z.string().nonempty("Required"),
    password: z.string().nonempty("Required"),
    confirmPassword: z.string().nonempty("Required")
  })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"], // Local do erro
      message: "As senhas não coincidem",
    });
  const { register, control, formState, handleSubmit } = useForm<SignupSchema>(
    {
      resolver: zodResolver(signupSchema),
    }
  );

  function handleSignUp(data: any) {
    return signupService.signupPost(data).then(e => {
      navigate(USER_ROUTES.LOGIN)
    })
  }

  return (
    <section className="min-h-screen flex-col text-white w-full flex items-center justify-center gap-6 bg-gradient-to-t from-main-black-800 to-main-black-900 p-3">
      <Section>
        <div className='flex items-center justify-center gap-6 flex-col'>
          <div className='flex gap-3 items-center mb-3'>
            <LockOpen className='w-9 h-9 text-main-violet-500' />
            <h1 className='font-semibold text-3xl '>Safeguard</h1>
          </div>
          {!success ?
            <div className='gap-3 flex flex-col bg-main-black-800 shadow-sm rounded sm:px-12 px-6 py-12 sm:w-fit w-full'>
              <Form onSubmit={handleSubmit((e) => setQuerys(() => handleSignUp(e)))}>
                <h1 className='font-semibold text-2xl'>Criar conta</h1>
                <InputRoot>
                  <Label>Nome</Label>
                  <InputText placeholder='Nome' {...register('name')} />
                  <Span variation='error'>{formState.errors.name?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>Sobrenome</Label>
                  <InputText placeholder='Sobrenome' {...register('lastName')} />
                  <Span variation='error'>{formState.errors.lastName?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>Username</Label>
                  <InputText placeholder='Nome' {...register('username')} />
                  <Span variation='error'>{formState.errors.username?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>E-Mail</Label>
                  <InputText placeholder='E-Mail' {...register('email')} />
                  <Span variation='error'>{formState.errors.email?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>Telefone</Label>
                  <InputText placeholder='Telefone' {...register('phone')} />
                  <Span variation='error'>{formState.errors.phone?.message}</Span>
                </InputRoot>
                <div>
                  <InputRoot>
                    <Label>Senha</Label>
                    <InputText placeholder='Senha' type="password" {...register('password')} />
                    <Span variation='error'>{formState.errors.password?.message}</Span>
                  </InputRoot>
                  <ul className="max-w-md mt-2 space-y-1 text-gray-500 list-disc list-inside text-sm">
                    <li>
                      Pelo menos uma letra maiúscula
                    </li>
                    <li>
                      Um caractere especial
                    </li>
                    <li>
                      Pelo menos um numero
                    </li>
                  </ul>
                </div>
                <InputRoot>
                  <Label>Confirmar senha</Label>
                  <InputText placeholder='Confirmar senha' type="password" {...register('confirmPassword')} />
                  <Span variation='error'>{formState.errors.confirmPassword?.message}</Span>
                </InputRoot>
                <Button loadingComponent={<LoaderCircle className={"rotating-div"} />} variation='default-full' loading={!finished}>
                  Criar Conta
                </Button>
              </Form>
            </div> :
            <div className='gap-6 flex flex-col center max-w-96 bg-main-black-800 shadow-sm rounded sm:px-12 px-6 py-12 sm:w-fit w-full'>
              <div className='flex items-center'>
                <h1 className='font-semibold text-2xl'>Conta criada com sucesso</h1>
                <ShieldCheck className='w-16 h-16' strokeWidth={1.5} />
              </div>
              <p >Agora você ja pode gerenciar suas contas.</p>
              <Button variation='default-full' onClick={() => navigate(USER_ROUTES.LOGIN)}>
                Voltar para tela de login
              </Button>
            </div>
          }

          <div className='flex gap-1 text-sm flex-wrap'>
            <p>Já possui uma conta?</p>
            <Link className='text-main-violet-500 font-semibold' to={"/login"}>Fazer login</Link>
          </div>
        </div>
      </Section>
    </section>
  )
}

export default Signup

export {
  SignupSchema
}
