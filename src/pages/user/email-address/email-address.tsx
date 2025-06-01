import React, { useEffect, useState } from 'react'
import Content from "../../../components/content";
import { useQuery } from "../../../utils/hooks/query-hooks";
import Loading from "../../helpers/loading/loading";
import { CirclePlusIcon, CopyIcon, MailIcon, TrashIcon } from 'lucide-react';
import InputText from '../../../components/input-text';
import { Link, useNavigate } from 'react-router-dom';
import { USER_ROUTES } from '../../../config/routes-config';
import { emailAddressService } from '../../../services/email-address-service';
import CardLoading from '../../helpers/loading/card-loading';
import TableRoot from '../../../components/table-root'
import TableHead from '../../../components/table-head'
import TableBody from '../../../components/table-body'
import TableRow from '../../../components/table-row'
import TableCell from '../../../components/table-cell'
import { EmailAddressEntity } from '../../../interfaces/entities/email-address-entity';
import { base64ToImage } from '../../../utils/extensions/image';
import { copyToClipboard } from '../../../utils/extensions/clipboard';

function EmailAddresses() {
    const [finished, setQuerys, setFinished] = useQuery()
    const [addButtonHovered, setAddButtonHovered] = useState(false)
    const [emailAddresses, setEmailAddresses] = useState<EmailAddressEntity[]>([]);
    const [filters, setFilters] = useState({ quantityItemsPage: 10, searchTerm: "" });
    const navigate = useNavigate()

    function handleGetEmailAddresses() {
        return emailAddressService.getAll()
            .then(({ res }: any) => {
                setEmailAddresses(res)
            })
    }

    function handleDeleteEmailAddress(id: number) {
        return emailAddressService.remove(id)
            .then(() => {
                setQuerys(() => handleGetEmailAddresses())
            })
    }

    useEffect(() => {
        setQuerys(() => handleGetEmailAddresses())
    }, [])
    return (
        <Content>
            <div className='w-full h-full flex-col overflow-auto rounded'>
                <div aria-selected={addButtonHovered} className={`transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500 aria-selected:bg-main-violet-700 bg-main-violet-900 teste3 flex-wrap flex items-end p-3 pl-6 py-6 gap-6`}>
                    <div className='flex gap-6 items-end'>
                        <div className='w-28 h-28 bg-tertiary rounded center'>
                            <MailIcon className='w-12 h-12' />
                        </div>
                        <div className='flex gap-1 flex-col'>
                            <h1 className='font-bold text-white sm:text-3xl font-sans text-2xl'>Addresses</h1>
                            <div className='flex gap-3'>
                                <Link
                                    to={USER_ROUTES.MANAGER_EMAIL_ADDRESS}
                                    onMouseLeave={() => setAddButtonHovered(false)}
                                    onMouseEnter={() => setAddButtonHovered(true)}
                                >
                                    <CirclePlusIcon className='text-main-violet-500 w-6 h-6 hover:text-main-violet-100 transition-all duration-300' />
                                </Link>
                                <p className='text-md font-semibold'>Quantity: {emailAddresses.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table section */}
                <div className='overflow-auto bg-gradient-to-t from-main-black-800 to-main-black-900 min-h-full w-full p-6 gap-6 flex flex-col'>
                    <div className='w-full max-w-80'>
                        <InputText
                            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                            placeholder='Search'
                            variation='ultra-rounded'
                        />
                    </div>

                    <CardLoading loading={!finished}>
                        <TableRoot>
                            <TableHead>
                                <TableRow variation='default-head'>
                                    <TableCell variation='head'>#</TableCell>
                                    <TableCell variation='head'></TableCell>
                                    <TableCell variation='head-full'>Address</TableCell>
                                    <TableCell variation='head-full'>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {emailAddresses
                                    .filter(e =>
                                        `${e.username}@${e.provider.signature}`
                                            .toLowerCase()
                                            .includes(filters.searchTerm.toLowerCase()))
                                    .map((e, index) => (
                                        <TableRow key={index}>
                                            <TableCell variation='body'>{index + 1}</TableCell>
                                            <TableCell variation='body'>
                                                <div className='w-12 h-12 bg-zinc-700 rounded flex items-center justify-center'>
                                                    <img
                                                        className='w-10'
                                                        src={base64ToImage(e.provider?.image?.storedFile.base64, e.provider?.image?.storedFile.mimeType)}
                                                        alt=""
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                onClick={() => navigate(`${USER_ROUTES.MANAGER_EMAIL_ADDRESS}?id=${e.id}`)}
                                                variation='body'
                                            >
                                                <p className='font-semibold'>{e.username}@{e.provider.signature}</p>
                                            </TableCell>
                                            <TableCell variation='body'>
                                                <button
                                                    onClick={() => copyToClipboard(`${e.username}@${e.provider.signature}`)}
                                                    className='z-20 p-3 group-hover:opacity-100 transition-all hover:text-main-violet-100'
                                                >
                                                    <CopyIcon />
                                                </button>
                                                <button
                                                    onClick={() => setQuerys(() => handleDeleteEmailAddress(e.id))}
                                                    className='z-20 p-3 group-hover:opacity-100 transition-all hover:text-red-400'
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </TableRoot> 
                    </CardLoading>
                </div>
            </div>
        </Content>
    )
}

export default EmailAddresses