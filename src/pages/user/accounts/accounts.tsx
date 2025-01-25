import React, { useEffect, useState } from 'react'
import Content from "../../../components/content";
import { useQuery } from "../../../utils/hooks/query-hooks";
import Loading from "../../helpers/loading/loading";
import { Building, CirclePlusIcon, CopyIcon, NetworkIcon, TrashIcon, UsersIcon } from 'lucide-react';
import InputText from '../../../components/input-text';
import { Link, useNavigate } from 'react-router-dom';
import { USER_ROUTES } from '../../../config/routes-config';
import { accountService } from '../../../services/accounts-service';
import CardLoading from '../../helpers/loading/card-loading';
import { AccountEntity } from '../../../interfaces/entities/account-entity';
import TableRoot from '../../../components/table-root'
import TableHead from '../../../components/table-head'
import TableBody from '../../../components/table-body'
import TableRow from '../../../components/table-row'
import TableCell from '../../../components/table-cell'
import { base64ToImage } from '../../../utils/extensions/image';
import { copyToClipboard } from '../../../utils/extensions/clipboard';

function Accounts() {
    const [finished, setQuerys, setFinished] = useQuery(true)
    const [addButtomHovered, setAddButtomHovered] = useState(false)
    const [account, setAccounts] = useState<AccountEntity[]>([]);
    const [filters, setFilters] = useState({ quantityItemsPage: 10, searchTerm: "" });
    const navigate = useNavigate()

    function handleGetAccounts() {
        return accountService.getAll()
            .then(({ res }: any) => {
                setAccounts(res)
            })
    }
    function handleDeleteDomain(id) {
        return accountService.remove(id)
            .then(() => {
                setQuerys(() => handleGetAccounts())
            })
    }

    useEffect(() => {
        setQuerys(() => handleGetAccounts())
    }, [])

    return (
        <Content >
            <div className=' w-full h-full flex-col overflow-auto rounded'>
                <div aria-selected={addButtomHovered} className={`transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500 aria-selected:bg-main-violet-700  bg-main-violet-900 teste3 flex-wrap flex items-end p-3 pl-6 py-6 gap-6`}>
                    <div className='flex gap-6 items-end'>
                        <div className='w-28 h-28 bg-tertiary rounded center'>
                            <UsersIcon className='w-12 h-12' />
                        </div>
                        <div className='flex gap-1 flex-col'>
                            <h1 className='font-bold text-white sm:text-3xl font-sans text-2xl'>Accounts</h1>
                            <div className='flex gap-3'>
                                <Link to={USER_ROUTES.MANAGER_ACCOUNTS} onMouseLeave={() => setAddButtomHovered(false)} onMouseEnter={() => setAddButtomHovered(true)}>
                                    <CirclePlusIcon className='text-main-violet-500 w-6 h-6 hover:text-main-violet-100 transition-all duration-300' />
                                </Link>
                                <p className='text-md font-semibold'>Quantity: {account.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='overflow-auto bg-gradient-to-t from-main-black-800 to-main-black-900 min-h-full w-full p-6 gap-6 flex flex-col    '>
                    <div className='w-full max-w-80'>
                        <InputText onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })} placeholder='Pesquisar' variation='ultra-rounded'></InputText>
                    </div>
                    <CardLoading loading={!finished}>
                        <TableRoot>
                            <TableHead>
                                <TableRow variation='default-head'>
                                    <TableCell variation='head'>#</TableCell>
                                    <TableCell variation='head'></TableCell>
                                    <TableCell variation='head-full'>Endereço</TableCell>
                                    <TableCell variation='head-full'>Senha</TableCell>
                                    <TableCell variation='head-full'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {account.filter(e =>
                                    e.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                                    e.platform.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                                    `${e.email.username}@${e.email.provider.signature}`.toLowerCase().includes(filters.searchTerm.toLowerCase())
                                ).map((item, index) =>
                                    <TableRow>
                                        <TableCell variation='body'>{index + 1}</TableCell>
                                        <TableCell variation='body'>
                                            <div className='w-12 h-12 bg-zinc-700 rounded flex items-center justify-center'>
                                                {item.platform.image &&
                                                    <img className='w-12' src={base64ToImage(item.platform?.image.base64, item.platform.image.mimeType)} alt="" />
                                                }
                                            </div>
                                        </TableCell>
                                        <TableCell onClick={() => navigate(`${USER_ROUTES.MANAGER_ACCOUNTS}?id=${item.id}`)} variation='body'>
                                            <div className='flex flex-col'>
                                                <p className='font-semibold text-base text-zinc-300'>{item.email.username}@{item.email.provider.signature}</p>
                                                <p className='font-semibold text-zinc-300'> {item.platform.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell variation='body'>
                                            <button onClick={() => copyToClipboard(item.password)} className='z-20  p-3 group-hover:opacity-100 transition-all hover:text-main-violet-100 '>
                                                <CopyIcon />
                                            </button>
                                        </TableCell>
                                        <TableCell variation='body'>
                                            <button onClick={() => setQuerys(() => handleDeleteDomain(item.id))} className='z-20  p-3 group-hover:opacity-100 transition-all hover:text-red-400 '>
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

export default Accounts