import React, { useEffect, useState } from 'react'
import Content from "../../../components/content";
import { useQuery } from "../../../utils/hooks/query-hooks";
import Loading from "../../helpers/loading/loading";
import { Building, CirclePlusIcon, TrashIcon } from 'lucide-react';
import InputText from '../../../components/input-text';
import { Link } from 'react-router-dom';
import { USER_ROUTES } from '../../../config/routes-config';
import { providerService } from '../../../services/provider-service';
import CardLoading from '../../helpers/loading/card-loading';
import { base64ToImage } from '../../../utils/extensions/image';

function Providers() {
    const [finished, setQuerys] = useQuery(true)
    const [addButtomHovered, setAddButtomHovered] = useState(false)
    const [provider, setProviders] = useState<any[]>([]);
    const [filters, setFilters] = useState({ quantityItemsPage: 10, searchTerm: "" });

    function handleGetProviders() {
        return providerService.getAll()
            .then(({ res }: any) => {
                setProviders(res)
            })
    }

    function handleDeleteProvider(id) {
        return providerService.remove(id)
            .then(() => {
                setQuerys(() => handleGetProviders())
            })
    }

    useEffect(() => {
        setQuerys(() => handleGetProviders())
    }, [])


    return (
        <>
            <Content >
                <div className=' w-full h-full flex-col overflow-auto rounded'>
                    <div aria-selected={addButtomHovered} className={`transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500 aria-selected:bg-main-violet-700  bg-main-violet-900 teste3 flex-wrap flex items-end p-3 pl-6 py-6 gap-6`}>
                        <div className='flex gap-6 items-end'>
                            <div className='w-28 h-28 bg-tertiary rounded center'>
                                <Building className='w-12 h-12' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <h1 className='font-bold text-white sm:text-3xl font-sans text-2xl'>Providers</h1>
                                <div className='flex gap-3'>
                                    <Link to={USER_ROUTES.MANAGER_DOMAINS} onMouseLeave={() => setAddButtomHovered(false)} onMouseEnter={() => setAddButtomHovered(true)}>
                                        <CirclePlusIcon className='text-main-violet-500 w-6 h-6 hover:text-main-violet-100 transition-all duration-300' />
                                    </Link>
                                    <p className='text-md font-semibold'>Quantity: {provider.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-gradient-to-t from-main-black-800 to-main-black-900 min-h-full w-full p-6 gap-6 flex flex-col    '>
                        <div className='w-full max-w-80'>
                            <InputText onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })} placeholder='Pesquisar' variation='ultra-rounded'></InputText>
                        </div>
                        <CardLoading loading={!finished}>
                            <div className='grid sm:grid-cols-2 xl:grid-cols-3 h-full gap-3'>
                                {provider.filter(e => e.name.toLowerCase().includes(filters.searchTerm.toLowerCase())).map((item, index) =>
                                    <div key={index}
                                        className=' bg-tertiary overflow-hidden rounded flex-col h-48 flex relative items-center transition-all justify-center group'
                                    >
                                        <button onClick={() => handleDeleteProvider(item.id)} className='z-20 opacity-0 p-3 group-hover:opacity-100 transition-all absolute top-0 right-0 hover:text-red-400 '>
                                            <TrashIcon />
                                        </button>
                                        <Link
                                            to={{
                                                pathname: USER_ROUTES.MANAGER_DOMAINS,
                                                search: "id=" + item.id
                                            }} className='w-full h-full flex flex-col gap-3 rounded center '
                                        >
                                            <img className='w-16' src={base64ToImage(item?.image.base64, item?.image.mimeType)} alt={item?.name} />
                                            <p className='font-seibold'>
                                                {item?.name}
                                            </p>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </CardLoading>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default Providers