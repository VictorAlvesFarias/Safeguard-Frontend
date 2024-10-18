import React, { useEffect, useState } from 'react'
import Content from "../../../components/content";
import { useQuery } from "../../../utils/hooks/query-hooks";
import Loading from "../../helpers/loading/loading";
import InputText from '../../../components/input-text';
import Form from '../../../components/form';
import Button from '../../../components/button';
import InputRoot from '../../../components/input-root'
import Span from '../../../components/span'
import Label from '../../../components/label'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { accountService } from '../../../services/accounts-service';
import If from '../../../base-components/if';
import { platformService } from '../../../services/platforms-service';
import { PlatformEntity } from '../../../interfaces/entities/platform-entity';
import DropdownContext from '../../../base-components/dropdown-context';
import DropdownRoot from '../../../components/dropdown-root';
import DropdownMenu from '../../../components/dropdown-menu';
import DropdownOption from '../../../components/dropdown-option'
import { EmailEntity } from '../../../interfaces/entities/email-entity';
import { emailService } from '../../../services/emails-service';

function AccountsManeger() {
    const [finished, setQuery, setFinished] = useQuery(false)
    const [currentImage, setCurrentImage] = useState("")
    const [currentImageSecundary, setCurrentImageSecundary] = useState<string>("")
    const [isEditable, setIsEditable] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [platforms, setPlatforms] = useState<PlatformEntity[]>([])
    const [emails, setEmails] = useState<EmailEntity[]>([])
    const back: any = -1
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const urlParams = {
        id: searchParams.get("id")
    }
    const schema = z.object({
        emailId: z.number(),
        platformId: z.number(),
        phone: z.string().nonempty('Campo obrigatório'),
        name: z.string().nonempty('Campo obrigatório'),
        username: z.string().nonempty('Campo obrigatório'),
        password: z.string().nonempty('Campo obrigatório'),
    })
    const { register, handleSubmit, formState: { errors }, setValue, reset, control, watch } = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
        }
    )

    function handleAddAccount(data) {
        return accountService.add(data)
            .then(r => {
                navigate(back)
            })
    }
    function handleUpdateAccount(data) {
        return accountService.update(data, urlParams.id)
            .then(() => {
                setIsEditing(false)
            })
    }
    function handleAddOrUpdate(data) {
        if (isEditable) {
            setQuery(() => handleUpdateAccount(data))
        }
        else {
            setQuery(() => handleAddAccount(data))
        }
    }
    function handleGetAccount() {
        return accountService.getById({ id: urlParams.id })
            .then(({ res }: any) => {
                reset(res)
                setIsEditable(true)
                setCurrentImage(res.image)
            })
    }
    function handleGetPlatforms() {
        return platformService.getAll().then(({ res }) => {
            setPlatforms(res)
        })
    }
    function handleGetEmails() {
        return emailService.getAll().then(({ res }) => {
            setEmails(res)
        })
    }


    useEffect(() => {
        if (urlParams.id != null) {
            setQuery([
                () => handleGetAccount(),
                () => handleGetPlatforms(),
                () => handleGetEmails()
            ])
        }
        else {
            setFinished(true)
            setIsEditing(true)
            setQuery([
                () => handleGetPlatforms(),
                () => handleGetEmails()
            ])
        }
    }, [])

    useEffect(() => {

        const platformImage = platforms.filter(e => e.id == watch("platformId"))[0]?.image
        const emailImage = emails.filter(e => e.id == watch("emailId"))[0]?.provider.image

        if (platformImage) {
            setCurrentImage(platformImage)
            setCurrentImageSecundary(emailImage)
        } 
        else {
            setCurrentImage(emailImage)
        }
    }, [watch("emailId"), watch("platformId")])

    return (
        <Content >
            <div className='bg-fort w-full h-full overflow-auto relative transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500   bg-main-violet-900'>
                <div className='flex w-full gap-3 items-center p-6'>
                    <Link className='cursor-pointer  bg-white bg-opacity-5 border-2 border-zinc-400 p-1.5 px-3 rounded-full top-0 left-0 ' to={back}>
                        Voltar
                    </Link>
                    <h1 className='font-bold font- text-white text-3xl font-sans '>Criar nova conta</h1>
                </div>
                <Loading loading={!finished} /> 
                <If conditional={finished}>
                    <div className='flex gap-3 w-full  my-28 rounded items-center justify-center  flex-col p-3  center '>
                        <div className='w-48 h-48 bg-tertiary rounded center relative'>
                            {currentImage && <img className='w-16 min-h-16 ' src={currentImage}></img>}
                            {currentImageSecundary && <img className='w-9 min-h-9 absolute bottom-0 right-0' src={currentImageSecundary}></img>}
                           
                        </div>
                        <div className=' w-full flex-1 rounded center max-w-96 flex-col'>
                            <Form variation='card' onSubmit={handleSubmit((e) => handleAddOrUpdate(e))} >
                                <InputRoot>
                                    <Label >Email</Label>
                                    <Controller
                                        name='emailId'
                                        control={control}
                                        render={({ field, field: { onChange } }) => {
                                            return (
                                                <DropdownContext onChange={onChange}>
                                                    <DropdownRoot {...field} disabled={!isEditing} placeholder='Provider'>
                                                        <DropdownMenu>
                                                            {emails.map((e, i) =>
                                                                <DropdownOption key={i} label={e.name} value={e.id} />
                                                            )}
                                                        </DropdownMenu>
                                                    </DropdownRoot>
                                                </DropdownContext>
                                            )
                                        }}
                                    />
                                    <Span variation='error'>{errors.emailId?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Platform</Label>
                                    <Controller
                                        name='platformId'
                                        control={control}
                                        render={({ field, field: { onChange } }) => {
                                            return (
                                                <DropdownContext onChange={onChange}>
                                                    <DropdownRoot  {...field} disabled={!isEditing} placeholder='Provider'>
                                                        <DropdownMenu>
                                                            {platforms.map((e, i) =>
                                                                <DropdownOption key={i} label={e.name} value={e.id} />
                                                            )}
                                                        </DropdownMenu>
                                                    </DropdownRoot>
                                                </DropdownContext>
                                            )
                                        }}
                                    />
                                    <Span variation='error'>{errors.platformId?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Name</Label>
                                    <InputText placeholder='Nome' {...register('name', { disabled: !isEditing })} />
                                    <Span variation='error'></Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Phone</Label>
                                    <InputText placeholder='Phone' {...register('phone', { disabled: !isEditing })} />
                                    <Span variation='error'></Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Username</Label>
                                    <InputText placeholder='Username' {...register('username', { disabled: !isEditing })} />
                                    <Span variation='error'></Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Password</Label>
                                    <InputText placeholder='Password' {...register('password', { disabled: !isEditing })} />
                                    <Span variation='error'></Span>
                                </InputRoot>
                                <If conditional={!isEditable}>
                                    <Button variation='default-full'>Adicionar</Button>
                                </If>
                                <If conditional={isEditable}>
                                    {
                                        isEditing ?
                                            <Button variation='default-full'>Salvar</Button> :
                                            <Span onClick={() => setIsEditing(true)} variation='button-default-full'>Editar</Span>
                                    }
                                </If>
                            </Form>
                        </div>
                    </div>
                </If>
            </div>
        </Content>
    )
}

export default AccountsManeger