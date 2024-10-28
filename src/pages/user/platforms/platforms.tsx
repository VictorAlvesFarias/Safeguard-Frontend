import React, { useEffect, useState } from 'react'
import Content from "../../../components/content";
import { useQuery } from "../../../utils/hooks/query-hooks";
import Loading from "../../helpers/loading/loading";
import { Building, CirclePlusIcon, NetworkIcon, TrashIcon } from 'lucide-react';
import InputText from '../../../components/input-text';
import { Link } from 'react-router-dom';
import { USER_ROUTES } from '../../../config/routes-config';
import { platformService } from '../../../services/platforms-service';
import CardLoading from '../../helpers/loading/card-loading';
import { base64ToImage } from '../../../utils/extensions/image';

function Platforms() {
    const [finished, setQuerys, setFinished] = useQuery(true)
    const [addButtomHovered, setAddButtomHovered] = useState(false)
    const [platform, setPlatforms] = useState<any[]>([]);
    const [filters, setFilters] = useState({ quantityItemsPage: 10, searchTerm: "" });

    function handleGetPlatforms() {
        return platformService.getAll()
            .then(({ res }: any) => {
                setPlatforms(res)
            })
    }

    function handleDeleteDomain(id) {
        return platformService.remove(id)
            .then(() => {
                setQuerys(() => handleGetPlatforms())
            })
    }

    useEffect(() => {
        setQuerys(() => handleGetPlatforms())
    }, [])


    return (
        <>
            <Content >
                <div className=' w-full h-full flex-col overflow-auto rounded'>
                    <div aria-selected={addButtomHovered} className={`transition-all bg-gradient-to-t from-main-black-800 to-transparent duration-500 aria-selected:bg-main-violet-700  bg-main-violet-900 teste3 flex-wrap flex items-end p-3 pl-6 py-6 gap-6`}>
                        <div className='flex gap-6 items-end'>
                            <div className='w-28 h-28 bg-tertiary rounded center'>
                                <NetworkIcon className='w-12 h-12' />
                            </div>
                            <div className='flex gap-1 flex-col'>
                                <h1 className='font-bold text-white sm:text-3xl font-sans text-2xl'>Platforms</h1>
                                <div className='flex gap-3'>
                                    <Link to={USER_ROUTES.MANAGER_PLATFORMS} onMouseLeave={() => setAddButtomHovered(false)} onMouseEnter={() => setAddButtomHovered(true)}>
                                        <CirclePlusIcon className='text-main-violet-500 w-6 h-6 hover:text-main-violet-100 transition-all duration-300' />
                                    </Link>
                                    <p className='text-md font-semibold'>Quantity: {platform.length}</p>
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
                                {platform.filter(e => e.name.toLowerCase().includes(filters.searchTerm.toLowerCase())).map((item, index) =>
                                    <div key={index}
                                        className=' bg-tertiary overflow-hidden rounded flex-col h-48 flex relative items-center transition-all justify-center group'
                                    >
                                        <button onClick={() => handleDeleteDomain(item.id)} className='z-20 opacity-0 p-3 group-hover:opacity-100 transition-all absolute top-0 right-0 hover:text-red-400 '>
                                            <TrashIcon />
                                        </button>
                                        <Link
                                            to={{
                                                pathname: USER_ROUTES.MANAGER_PLATFORMS,
                                                search: "id=" + item.id
                                            }} className='w-full h-full flex flex-col gap-3 rounded center '
                                        >
                                            <img className='w-16' src={base64ToImage(item?.image?.base64, item?.image?.mimeType)} alt={item?.name} />
                                            <p className='font-semibold'>
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

export default Platforms