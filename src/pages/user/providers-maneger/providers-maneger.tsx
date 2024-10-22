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
import If from '../../../base-components/if';
import { objectToFormData } from '../../../utils/extensions/formData';
import { base64ToImage } from '../../../utils/extensions/image';
import { toFormData } from 'axios';


function ProvidersManeger() {
    const [finished, setQuery, setFinished] = useQuery(false)
    const [currentImage, setCurrentImage] = useState<null | string>(null)
    const [isEditable, setIsEditable] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const back: any = -1
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const urlParams = {
        id: searchParams.get("id")
    }
    const schema = z.object({
        name: z.string().nonempty('Campo obrigatório'),
        description: z.string().nonempty('Campo obrigatório'),
        signature: z.string().nonempty('Campo obrigatório'),
        image: z.instanceof(File).refine((file) => file != null, "Campo obrigatório"),
    })
    const { register, handleSubmit, formState: { errors }, setValue, reset, control } = useForm<z.infer<typeof schema>>(
        {
            resolver: zodResolver(schema),
        }
    )

    function handleFile(image: any) {
        const file = image.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function (event: any) {
            setValue("image", file)
            setCurrentImage(event.target.result)
        };
    }
    function handleAddProvider(data) {
        return providerService.add(toFormData(data))
            .then(r => {
                navigate(back)
            })
    }
    function handleUpdateProvider(data) {
        return providerService.update(toFormData(data), urlParams.id)
            .then(() => {
                setIsEditing(false)
            })
    }
    function handleAddOrUpdate(data) {
        if (isEditable) {
            setQuery(() => handleUpdateProvider(data))
        }
        else {
            setQuery(() => handleAddProvider(data), false)
        }
    }
    function handleGetProvider() {
        return providerService.getById({ id: urlParams.id })
            .then(({ res }: any) => {
                reset(res)
                setIsEditable(true)
                setCurrentImage(base64ToImage(res.image.base64, res.image.mimeType))
            })
    }

    useEffect(() => {
        if (urlParams.id != null) {
            setQuery(() => handleGetProvider())
        }
        else {
            setFinished(true)
            setIsEditing(true)
        }
    }, [])

    return (
        <Content >
            <div className='bg-fort w-full h-full overflow-auto relative transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500   bg-main-violet-900'>
                <div className='flex w-full gap-3 items-center p-6'>
                    <Link className='cursor-pointer  bg-white bg-opacity-5 border-2 border-zinc-400 p-1.5 px-3 rounded-full top-0 left-0 ' to={back}>
                        Voltar
                    </Link>
                    <h1 className='font-bold font- text-white text-3xl font-sans '>Adicionar provedor</h1>
                </div>
                <Loading loading={!finished} />
                <If conditional={finished}>
                    <div className='flex gap-3 w-full  my-28 rounded items-center justify-center  flex-col p-3  center '>
                        <div className='w-48 h-48 bg-tertiary rounded center'>
                            {currentImage && <img className='w-16 min-h-16' src={currentImage}></img>}
                        </div>
                        <If conditional={isEditing || isEditable == false}>
                            <label htmlFor="providerImage" className='cursor-pointer mt-3 bg-white bg-opacity-5 border-2 border-zinc-400 p-1.5 px-3 rounded-full'>
                                Selecionar
                                <input className="hidden" type="file" onChange={handleFile} id="providerImage" />
                            </label>
                        </If>
                        <div className=' w-full flex-1 rounded center max-w-96 flex-col'>
                            <Form variation='card' onSubmit={handleSubmit((e) => handleAddOrUpdate(e))} >
                                <InputRoot>
                                    <Label >Name</Label>
                                    <InputText placeholder='Nome' {...register('name', { disabled: !isEditing })} />
                                    <Span variation='error'></Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Provider</Label>
                                    <InputText placeholder='Username' {...register('signature', { disabled: !isEditing })} />
                                    <Span variation='error'></Span>
                                </InputRoot>
                                <InputRoot>
                                    <Label >Descrição</Label>
                                    <InputText placeholder='Telefone' {...register('description', { disabled: !isEditing })} />
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

export default ProvidersManeger