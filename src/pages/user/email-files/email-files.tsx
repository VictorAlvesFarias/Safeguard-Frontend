import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, DownloadIcon, TrashIcon, UploadIcon } from 'lucide-react';
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
import Button from '../../../components/button';
import { emailFileService } from '../../../services/email-files-service';
import { EmailFileEntity } from '../../../interfaces/entities/email-file-entity';

function EmailFile() {
    const [finished, setQuerys, setFinished] = useQuery(true)
    const back: any = -1
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { state } = useLocation()
    const [files, setFiles] = useState<EmailFileEntity[]>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const schema = z.object({
        file: z.any()
    })

    const { handleSubmit, register, formState: { errors }, reset } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    const urlParams = {
        id: searchParams.get("id")
    }

    function handleDeleteFile(id: string | number | undefined) {
        return emailFileService.remove(id)
            .then(e => {
                setQuerys(() => getEmailFile())
            })
    }

    function handleUploadFile() {
        if (!selectedFile || !urlParams.id) return;

        return emailFileService.add({ image: selectedFile, emailId: urlParams.id })
            .then(e => {
                setSelectedFile(null);
                reset();
                setQuerys(() => getEmailFile())
            })
    }

    function getEmailFile() {
        return emailFileService.getAll({ emailId: urlParams.id })
            .then(({ res }) => {
                setFiles(res)
            })
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    }

    function downloadFile(file: EmailFileEntity) {
        const link = document.createElement('a');
        link.href = `data:${file.storedFile.mimeType};base64,${file.storedFile.base64}`;
        link.download = file.storedFile.name;
        link.click();
    }

    useEffect(() => {
        setQuerys(() => getEmailFile())
    }, [])

    return (
        <Content >
            <div className='w-full h-full flex-col overflow-auto rounded bg-fort bg-gradient-to-t from-main-black-800 to-transparent duration-500 bg-main-violet-900'>
                <div className='flex w-full gap-3 items-center p-6'>
                    <Link className='cursor-pointer  bg-white bg-opacity-5 hover:bg-opacity-15 w-10 h-10 flex items-center justify-center border-2 border-zinc-400 rounded-full top-0 left-0 ' to={back}>
                        <ChevronLeft />
                    </Link>
                    <h1 className='font-bold font- text-white text-3xl font-sans '>Email Files</h1>
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
                <div className='overflow-auto bg-opacity-50 min-h-full w-full p-6 gap-6 flex flex-col'>
                    <form className='flex gap-3 items-center' onSubmit={handleSubmit(handleUploadFile)}>
                        <div className='w-full'>
                            <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed rounded-lg cursor-pointer bg-white bg-opacity-5 hover:bg-opacity-15 border-zinc-400">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                                    {selectedFile ? (
                                        <p className="text-sm text-white">{selectedFile.name}</p>
                                    ) : (
                                        <>
                                            <UploadIcon className="w-6 h-6 mb-1 text-white" />
                                            <p className="text-sm text-white">Click to upload or drag and drop</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    {...register('file')}
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <Button type="submit" disabled={!selectedFile}>Upload</Button>
                    </form>
                    <CardLoading loading={!finished}>
                        <TableRoot variation='default'>
                            <TableHead>
                                <TableRow variation='default-head'>
                                    <TableCell variation='head'>#</TableCell>
                                    <TableCell variation='head-full'>File Name</TableCell>
                                    <TableCell variation='head'>Type</TableCell>
                                    <TableCell variation='head'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {files.map((item, index) =>
                                    <TableRow key={item.id}>
                                        <TableCell variation='body'>{index + 1}</TableCell>
                                        <TableCell variation='body'>
                                            <div className='flex flex-col'>
                                                <p className='font-semibold text-base text-zinc-300'>{item.storedFile.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell variation='body'>
                                            <p className='font-semibold text-base text-zinc-300'>{item.storedFile.mimeType}</p>
                                        </TableCell>
                                        <TableCell variation='body'>
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() => downloadFile(item)}
                                                    className='z-20 p-3 group-hover:opacity-100 transition-all hover:text-main-violet-100'
                                                >
                                                    <DownloadIcon />
                                                </button>
                                                <button
                                                    onClick={() => setQuerys(() => handleDeleteFile(item.id))}
                                                    className='z-20 p-3 group-hover:opacity-100 transition-all hover:text-red-400'
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
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

export default EmailFile