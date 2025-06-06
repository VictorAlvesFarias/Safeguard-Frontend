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
import { providerService } from '../../../services/provider-service';
import { emailAddressService } from '../../../services/email-address-service';
import If from '../../../base-components/if';
import DropdownContext from '../../../base-components/dropdown-context';
import DropdownRoot from '../../../components/dropdown-root';
import DropdownMenu from '../../../components/dropdown-menu';
import DropdownOption from '../../../components/dropdown-option'
import { ProviderEntity } from '../../../interfaces/entities/provider-entity';
import { base64ToImage } from '../../../utils/extensions/image';
import { ChevronLeft } from 'lucide-react';

function EmailAddressManeger() {
    const [finished, setQuery, setFinished] = useQuery(false)
    const [currentImage, setCurrentImage] = useState<string | null>()
    const [isEditable, setIsEditable] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [providers, setProviders] = useState<ProviderEntity[]>([])
    const back: any = -1
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const urlParams = {
        id: searchParams.get("id")
    }
    const schema = z.object({
        username: z.string().nonempty('Required'),
        providerId: z.number().nonnegative('Required'),
    })
    const { register, handleSubmit, formState: { errors }, setValue, reset, control, watch } = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
        }
    )

    function handleAddEmailAdddress(data) {
        return emailAddressService.add({
            ...data
        })
            .then(r => {
                navigate(back)
            })
    }
    function handleUpdateEmailAdddress(data) {
        return emailAddressService.update({
            ...data
        }, urlParams.id)
            .then(() => {
                setIsEditing(false)
            })
    }
    function handleAddOrUpdate(data) {
        if (isEditable) {
            setQuery(() => handleUpdateEmailAdddress(data))
        }
        else {
            setQuery(() => handleAddEmailAdddress(data))
        }
    }
    function handleGetEmailAdddress() {
        return emailAddressService.getById({ id: urlParams.id })
            .then(({ res }) => {
                reset({
                    ...res,
                    providerId: res.provider.id
                })
                setIsEditable(true)
                setCurrentImage(base64ToImage(res.provider.image.storedFile.base64, res.provider.image.storedFile.mimeType))
            })
    }
    function handleGetProviders() {
        return providerService.getAll().then(({ res }) => {
            setProviders(res)
        })
    }

    useEffect(() => {
        if (urlParams.id != null) {
            setQuery([
                () => handleGetEmailAdddress(),
                () => handleGetProviders(),
            ])
        }
        else {
            setFinished(true)
            setIsEditing(true)
            setQuery([
                () => handleGetProviders(),
            ])
        }
    }, [])

    useEffect(() => {
        const image = providers.filter(e => e.id == watch("providerId"))[0]?.image
        setCurrentImage(base64ToImage(image?.storedFile.base64, image?.storedFile.mimeType))
    }, [watch("providerId")])

    return (
        <Content >
            <div className='bg-fort w-full h-full overflow-auto relative transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500   bg-main-violet-900'>
                <div className='flex w-full gap-3 items-center p-6'>
                    <Link className='cursor-pointer  bg-white bg-opacity-5 hover:bg-opacity-15 w-10 h-10 flex items-center justify-center border-2 border-zinc-400 rounded-full top-0 left-0 ' to={back}>
                        <ChevronLeft />
                    </Link>
                    <h1 className='font-bold font- text-white text-3xl font-sans '>{urlParams.id ? "Address" : "New Address"}</h1>
                </div>
                <Loading loading={!finished} />
                <If conditional={finished}>
                    <div className='flex gap-3 w-full  my-28 rounded items-center justify-center  flex-col p-3  center '>
                        <div className='w-48 h-48 bg-tertiary rounded center relative'>
                            {currentImage && <img className='w-16 min-h-16 ' src={currentImage}></img>}
                        </div>
                        <div className=' w-full flex-1 rounded center max-w-96 flex-col'>
                            <Form variation='card' onSubmit={handleSubmit((e) => handleAddOrUpdate(e))} >
                                <InputRoot>
                                    <Label >Username</Label>
                                    <InputText placeholder='Username' {...register('username', { disabled: !isEditing })} />
                                    <Span variation='error'>{errors.username?.message}</Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Provider</Label>
                                    <Controller
                                        name='providerId'
                                        control={control}
                                        render={({ field, field: { onChange } }) => {
                                            return (
                                                <DropdownContext onChange={onChange}>
                                                    <DropdownRoot {...field} disabled={!isEditing} placeholder='Provider'>
                                                        <DropdownMenu>
                                                            {providers.map((e, i) =>
                                                                <DropdownOption key={i} label={e.name} value={e.id} />
                                                            )}
                                                        </DropdownMenu>
                                                    </DropdownRoot>
                                                </DropdownContext>
                                            )
                                        }}
                                    />
                                    <Span variation='error'>{errors.providerId?.message}</Span>
                                </InputRoot>
                                <If conditional={!isEditable}>
                                    <Button variation='default-full'>Add</Button>
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

export default EmailAddressManeger