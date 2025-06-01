import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, CopyIcon, TrashIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import Content from "../../../components/content";
import TableBody from '../../../components/table-body';
import TableCell from '../../../components/table-cell';
import TableHead from '../../../components/table-head';
import TableRoot from '../../../components/table-root';
import TableRow from '../../../components/table-row';
import { useQuery } from "../../../utils/hooks/query-hooks";
import CardLoading from '../../helpers/loading/card-loading';
import { copyToClipboard } from '../../../utils/extensions/clipboard';
import InputText from '../../../components/input-text';
import Button from '../../../components/button';
import { recoveryKeyService } from '../../../services/recovery-key-service';
import { RecoveryKey } from '../../../interfaces/entities/recovery-key-entity';

function RecoveryKeys() {
    const [finished, setQuerys, setFinished] = useQuery(true)
    const back: any = -1
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { state } = useLocation()
    const [keys, setKeys] = useState<RecoveryKey[]>([])

    const schema = z.object({
        key: z.string().nonempty()
    })

    const { handleSubmit, register, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    const urlParams = {
        id: searchParams.get("id")
    }

    function handleDeleteKey(id: string) {
        return recoveryKeyService.remove(id)
            .then(e => {
                setQuerys(() => getRecoveryKeys())
            })
    }
    function handleAddRecoveryKey(data) {
        return recoveryKeyService.add({
            ...data,
            emailId: urlParams.id
        })
            .then(e => {
                setQuerys(() => getRecoveryKeys())
            })
    }
    function getRecoveryKeys() {
        return recoveryKeyService.getAll({ emailId: urlParams.id })
            .then(({ res }) => {
                setKeys(res)
            })
    }

    useEffect(() => {
        setQuerys(() => getRecoveryKeys())
    }, [])

    return (
        <Content >
            <div className='w-full h-full flex-col overflow-auto rounded bg-fort bg-gradient-to-t from-main-black-800 to-transparent duration-500 bg-main-violet-900'>
                <div className='flex w-full gap-3 items-center p-6'>
                    <Link className='cursor-pointer  bg-white bg-opacity-5 hover:bg-opacity-15 w-10 h-10 flex items-center justify-center border-2 border-zinc-400 rounded-full top-0 left-0 ' to={back}>
                        <ChevronLeft />
                    </Link>
                    <h1 className='font-bold font- text-white text-3xl font-sans '>Recovery Keys</h1>
                </div>
                <div className='flex gap-6 items-end pl-6 pb-6'>
                    <div className='w-28 h-28 bg-tertiary rounded center relative '>
                        {state.currentImage && <img className='w-12 min-h-12 ' src={state.currentImage}></img>}
                        {state.currentImageSecundary && <img className='w-6 min-h-6 absolute bottom-0 right-0 m-1' src={state.currentImageSecundary}></img>}
                    </div>
                    <div className='flex gap-1 flex-col'>
                        <h1 className='font-bold text-white sm:text-3xl font-sans text-2xl'>{state.platform}</h1>
                        <p className='font-bold text-white font-sans'>{state.email}</p>
                    </div>
                </div>
                <div className='overflow-auto bg-opacity-50 min-h-full w-full p-6 gap-6 flex flex-col    '>
                    <form className='flex gap-3' onSubmit={handleSubmit((e) => setQuerys(() => handleAddRecoveryKey(e)))}>
                        <div className='w-full '>
                            <InputText {...register('key')} placeholder='New key' variation='ultra-rounded'></InputText>
                        </div>
                        <Button>Add</Button>
                    </form>
                    <CardLoading loading={!finished}>
                        <TableRoot>
                            <TableHead>
                                <TableRow variation='default-head'>
                                    <TableCell variation='head'>#</TableCell>
                                    <TableCell variation='head-full'>Key</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {keys.map((item, index) =>
                                    <TableRow>
                                        <TableCell variation='body'>{index + 1}</TableCell>
                                        <TableCell variation='body'>
                                            <div className='flex flex-col'>
                                                <p className='font-semibold text-base text-zinc-300'>{item.key}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell variation='body'>
                                            <button onClick={() => copyToClipboard(item)} className='z-20  p-3 group-hover:opacity-100 transition-all hover:text-main-violet-100 '>
                                                <CopyIcon />
                                            </button>
                                        </TableCell>
                                        <TableCell variation='body'>
                                            <button onClick={() => setQuerys(() => handleDeleteKey(item.id))} className='z-20  p-3 group-hover:opacity-100 transition-all hover:text-red-400 '>
                                                <TrashIcon />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </TableRoot>
                    </CardLoading>
                </div>
            </div>
        </Content>

    )
}

export default RecoveryKeys