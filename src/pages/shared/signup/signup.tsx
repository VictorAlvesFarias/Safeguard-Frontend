import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import { LockOpen, ShieldCheck, LoaderCircle } from 'lucide-react';
import Form from '../../../components/form';
import Button from '../../../components/button';
import InputRoot from '../../../components/input-root';
import Span from '../../../components/span';
import Label from '../../../components/label';
import InputText from '../../../components/input-text';
import Section from '../../../components/section';
import { signupService } from '../../../services/signup-service';
import { useQuery } from '../../../utils/hooks/query-hooks';
import { USER_ROUTES } from '../../../config/routes-config';

interface SignupSchema {
  name: string;
  username: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const [finished, setQueries] = useQuery(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const signupSchema = z.object({
    name: z.string().nonempty("Required"),
    username: z.string().nonempty("Required"),
    lastName: z.string().nonempty("Required"),
    email: z.string().nonempty("Required").email("Invalid E-Mail"),
    phone: z.string().nonempty("Required"),
    password: z.string().nonempty("Required"),
    confirmPassword: z.string().nonempty("Required")
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

  const { register, formState, handleSubmit } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  function handleSignUp(data: SignupSchema) {
    return signupService.signupPost(data).then(() => {
      setSuccess(true);
    });
  }

  return (
    <section className="min-h-screen flex-col text-white w-full flex items-center justify-center gap-6 bg-gradient-to-t from-main-black-800 to-main-black-900 p-3">
      <Section>
        <div className='flex items-center justify-center gap-6 flex-col'>
          <div className='flex gap-3 items-center mb-3'>
            <LockOpen className='w-9 h-9 text-main-violet-500' />
            <h1 className='font-semibold text-3xl'>Safeguard</h1>
          </div>
          {!success ? (
            <div className='gap-3 flex flex-col bg-main-black-800 shadow-sm rounded sm:px-12 px-6 py-12 sm:w-fit w-full'>
              <Form onSubmit={handleSubmit((data) => setQueries(() => handleSignUp(data)))}>
                <h1 className='font-semibold text-2xl'>Create Account</h1>
                <InputRoot>
                  <Label>Name</Label>
                  <InputText placeholder='Name' {...register('name')} />
                  <Span variation='error'>{formState.errors.name?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>Last Name</Label>
                  <InputText placeholder='Last Name' {...register('lastName')} />
                  <Span variation='error'>{formState.errors.lastName?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>Username</Label>
                  <InputText placeholder='Username' {...register('username')} />
                  <Span variation='error'>{formState.errors.username?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>Email</Label>
                  <InputText placeholder='Email' {...register('email')} />
                  <Span variation='error'>{formState.errors.email?.message}</Span>
                </InputRoot>
                <InputRoot>
                  <Label>Phone</Label>
                  <InputText placeholder='Phone' {...register('phone')} />
                  <Span variation='error'>{formState.errors.phone?.message}</Span>
                </InputRoot>
                <div>
                  <InputRoot>
                    <Label>Password</Label>
                    <InputText placeholder='Password' type="password" {...register('password')} />
                    <Span variation='error'>{formState.errors.password?.message}</Span>
                  </InputRoot>
                  <ul className="max-w-md mt-2 space-y-1 text-gray-500 list-disc list-inside text-sm">
                    <li>At least one uppercase letter</li>
                    <li>One special character</li>
                    <li>At least one number</li>
                  </ul>
                </div>
                <InputRoot>
                  <Label>Confirm Password</Label>
                  <InputText placeholder='Confirm Password' type="password" {...register('confirmPassword')} />
                  <Span variation='error'>{formState.errors.confirmPassword?.message}</Span>
                </InputRoot>
                <Button loadingComponent={<LoaderCircle className="rotating-div" />} variation='default-full' loading={!finished}>
                  Create Account
                </Button>
              </Form>
            </div>
          ) : (
            <div className='gap-6 flex flex-col center max-w-96 bg-main-black-800 shadow-sm rounded sm:px-12 px-6 py-12 sm:w-fit w-full'>
              <div className='flex items-center'>
                <h1 className='font-semibold text-2xl'>Account Successfully Created</h1>
                <ShieldCheck className='w-16 h-16' strokeWidth={1.5} />
              </div>
              <p>You can now manage your accounts.</p>
              <Button variation='default-full' onClick={() => navigate(USER_ROUTES.LOGIN)}>
                Back to Login
              </Button>
            </div>
          )}
          <div className='flex gap-1 text-sm flex-wrap'>
            <p>Already have an account?</p>
            <Link className='text-main-violet-500 font-semibold' to={"/login"}>Log In</Link>
          </div>
        </div>
      </Section>
    </section>
  );
}

export default Signup;

export { SignupSchema };
