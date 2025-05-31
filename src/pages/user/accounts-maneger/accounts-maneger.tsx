import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import DropdownContext from '../../../base-components/dropdown-context';
import If from '../../../base-components/if';
import Button from '../../../components/button';
import Content from "../../../components/content";
import DropdownMenu from '../../../components/dropdown-menu';
import DropdownOption from '../../../components/dropdown-option';
import DropdownRoot from '../../../components/dropdown-root';
import Form from '../../../components/form';
import InputRoot from '../../../components/input-root';
import InputText from '../../../components/input-text';
import Label from '../../../components/label';
import Span from '../../../components/span';
import { MASK } from '../../../config/mask-confg';
import { EmailEntity } from '../../../interfaces/entities/email-entity';
import { PlatformEntity } from '../../../interfaces/entities/platform-entity';
import { accountService } from '../../../services/accounts-service';
import { emailService } from '../../../services/emails-service';
import { platformService } from '../../../services/platforms-service';
import { dateFormat } from '../../../utils/extensions/date';
import { base64ToImage } from '../../../utils/extensions/image';
import { useQuery } from "../../../utils/hooks/query-hooks";
import Loading from "../../helpers/loading/loading";
import { USER_ROUTES } from '../../../config/routes-config';
import { ChevronLeft } from 'lucide-react';
import Accordion from '../../../base-components/accordion';
import AccordionRoot from '../../../components/accordion-root';
import AccordionTitle from '../../../components/accordion-title';
import AccordionContext from '../../../base-components/accordion-context';


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
        phone: z.string().nonempty('Required'),
        name: z.string().nonempty('Required'),
        lastName: z.string(),
        birthDate: z.string().refine(value => moment(value, "DD/MM/YYYY").isValid(), {
            message: "Invalid date"
        }),
        username: z.string().nonempty('Required'),
        password: z.string().nonempty('Required'),
    })
    const { register, handleSubmit, formState: { errors }, setValue, reset, control, watch } = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
        }
    )

    function getEmail() {
        const email = emails.find(e => e.id == watch("emailId"))

        return email
    }
    function getPlatform() {
        const platform = platforms.find(e => e.id == watch("platformId"))

        return platform
    }
    function handleAddAccount(data) {
        return accountService.add({
            ...data,
            birthDate: new Date(dateFormat(data.birthDate))
        })
            .then(r => {
                navigate(back)
            })
    }
    function handleUpdateAccount(data) {
        return accountService.update({
            ...data,
            birthDate: new Date(dateFormat(data.birthDate))
        }, urlParams.id)
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
            .then(({ res }) => {
                reset({
                    ...res,
                    birthDate: moment(res.birthDate).format("DD/MM/YYYY")
                })
                setIsEditable(true)
                setCurrentImage(
                    res.platform.image == null ?
                        base64ToImage(res.email.provider.image.base64, res.email.provider.image.mimeType)
                        :
                        base64ToImage(res.platform.image.base64, res.platform.image.mimeType)
                )
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
        const platformImage = platforms.find(e => e.id == watch("platformId"))?.image

        setCurrentImage(base64ToImage(platformImage?.base64, platformImage?.mimeType))
    }, [watch("platformId")])

    useEffect(() => {
        const email = emails.find(e => e.id == watch("emailId"))
        const emailImage = email?.provider?.image

        setCurrentImageSecundary(base64ToImage(emailImage?.base64, emailImage?.mimeType))

        if (isEditable == false && watch("name")?.trim() == '' && watch("lastName")?.trim() == '' && watch("phone")?.trim() == '' && watch("birthDate")?.trim() == '' && watch("username")?.trim() == '') {
            console.log("Teste")
            
            reset({
                ...watch(),
                birthDate: email?.birthDate,
                phone: email?.phone,
                name: email?.name,
                lastName: email?.lastName,
                username: email?.username,
            })
        }
    }, [watch("emailId")])

    return (
        <Content >
            <div className='bg-fort w-full h-full overflow-auto relative transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500 bg-main-violet-900'>
                <div className='flex w-full gap-3 items-center p-6'>
                    <Link className='cursor-pointer  bg-white bg-opacity-5 hover:bg-opacity-15 w-10 h-10 flex items-center justify-center border-2 border-zinc-400 rounded-full top-0 left-0 ' to={back}>
                        <ChevronLeft />
                    </Link>
                    <h1 className='font-bold font- text-white text-3xl font-sans '>{!urlParams.id ? "New Account" : "Account"}</h1>
                </div>
                <Loading loading={!finished} />
                <If conditional={finished}>
                    <div className='flex gap-3 w-full  my-28 rounded items-center justify-center  flex-col p-3  center '>
                        <div className='w-48 h-48 bg-tertiary rounded center relative'>
                            {<img className='w-16 min-h-16 ' src={currentImage}></img>}
                            {currentImageSecundary && <img className='w-9 min-h-9 absolute bottom-0 right-0 m-1' src={currentImageSecundary}></img>}
                        </div>
                        <div className=' w-full flex-1 rounded center max-w-96 flex-col gap-3'>
                            <If conditional={urlParams.id != null}>
                                <AccordionContext>
                                    <AccordionRoot variation='full'>
                                        <AccordionTitle>
                                            <div className=' flex w-full justify-center'>
                                                <div className='cursor-pointer  bg-white bg-opacity-5 hover:bg-opacity-15 px-3 p-1 flex items-center justify-center border-2 border-zinc-400 rounded-full top-0 left-0 '>
                                                    Recovery options
                                                </div>
                                            </div>
                                        </AccordionTitle>
                                        <Accordion className='w-full'>
                                            <Link
                                                className='bg-black p-3 bg-opacity-30 cursor-pointer hover:text-violet-500 transition font-semibold'
                                                to={`${USER_ROUTES.RECOVERY_KEYS}?id=${urlParams.id}`}
                                                state={
                                                    {
                                                        currentImage,
                                                        currentImageSecundary,
                                                        email: `${getEmail()?.username}@${getEmail()?.provider.signature}`,
                                                        platform: getPlatform()?.name
                                                    }
                                                }
                                            >
                                                Keys
                                            </Link>
                                            <Link
                                                className='bg-black p-3 bg-opacity-30 cursor-pointer hover:text-violet-500 transition font-semibold'
                                                to={`${USER_ROUTES.RECOVERY_EMAILS}?id=${urlParams.id}`}
                                                state={
                                                    {
                                                        currentImage,
                                                        currentImageSecundary,
                                                        email: `${getEmail()?.username}@${getEmail()?.provider.signature}`,
                                                        platform: getPlatform()?.name
                                                    }
                                                }
                                            >
                                                E-mails
                                            </Link>
                                        </Accordion>
                                    </AccordionRoot>
                                </AccordionContext>
                            </If>
                            <Form variation='card' onSubmit={handleSubmit((e) => handleAddOrUpdate(e))} >
                                <InputRoot>
                                    <Label >Email</Label>
                                    <Controller
                                        name='emailId'
                                        control={control}
                                        render={({ field, field: { onChange } }) => {
                                            return (
                                                <DropdownContext onChange={onChange}>
                                                    <DropdownRoot  {...field} disabled={!isEditing} placeholder='Provider'>
                                                        <DropdownMenu>
                                                            {emails.map((e, i) =>
                                                                <DropdownOption key={i} label={`${e.username}@${e.provider.signature}`} value={e.id} />
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
                                    <InputText placeholder='Name' {...register('name', { disabled: !isEditing })} />
                                    <Span variation='error'>{errors.name?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Last name</Label>
                                    <InputText placeholder='Last name' {...register('lastName', { disabled: !isEditing })} />
                                    <Span variation='error'>{errors.lastName?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Birth Data</Label>
                                    <InputText date='dd/mm/yyyy' type='date' placeholder='00/00/0000' {...register('birthDate', { disabled: !isEditing })} />
                                    <Span variation='error'>{errors.birthDate?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Phone</Label>
                                    <InputText mask={MASK.PHONE} placeholder='Phone' {...register('phone', { disabled: !isEditing })} />
                                    <Span variation='error'>{errors.phone?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Username</Label>
                                    <InputText placeholder='Username' {...register('username', { disabled: !isEditing })} />
                                    <Span variation='error'>{errors.username?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Password</Label>
                                    <InputText placeholder='Password' {...register('password', { disabled: !isEditing })} />
                                    <Span variation='error'>{errors.password?.message}</Span>
                                </InputRoot>
                                <If conditional={!isEditable}>
                                    <Button variation='default-full'>Create</Button>
                                </If>
                                <If conditional={isEditable}>
                                    {
                                        isEditing ?
                                            <Button variation='default-full'>Save</Button> :
                                            <Span onClick={() => setIsEditing(true)} variation='button-default-full'>Edit</Span>
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