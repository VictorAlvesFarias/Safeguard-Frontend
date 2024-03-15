import React, { useState } from 'react'
import NavBarLateral from '../containers/NavBarLateral'
import { Link } from 'react-router-dom'
import { AtSign, Building, FileStack, Home, LogOut, Mail } from 'lucide-react'

function NavBarLateralDefault() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <div className='md:hidden z-10 top-0 left-0 bg-tertiary-solid m-2 rounded  flex items-center'>
                <button type="button" onClick={() => setMobileMenuOpen(true)} className={` flex first-line:items-center justify-center rounded p-6 transition-all text-gray-700 `}>
                    <svg className={"h-7 w-9 text-yellow-50 stroke-black dark:stroke-white"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <NavBarLateral 
                setMobileMenuOpen={setMobileMenuOpen}
                mobileMenuOpen={mobileMenuOpen}
            >
                <div className='md:p-2 gap-3 w-60 h-full p-2'>
                    <div className='flex flex-col shadow-lg h-full gap-2'>
{/*                         <div className='flex w-full md:hidden justify-end '>
                            <button onClick={() => setMobileMenuOpen(false)} type="button" className="relative right-0">
                                Voltar
                            </button>
                        </div> */}
                        <div className='flex flex-col text-sm p-3 py-3 rounded bg-tertiary-solid '>
                            <Link to={'/accounts'} className='flex gap-3 items-center p-3 rounded'>
                                <Home strokeWidth={1.7} className='w-6 h-6'/>
                                <p className='text-base font-semibold'>Home</p>
                            </Link>
                        </div>
                        <div className='flex flex-col gap-3 text-sm p-3 py-3 rounded flex-1 bg-fort '>
                            <p className='mb-3 text-base font-semibold'>Perfil</p>
                            <div className='flex-col gap-2 flex'>
                                <Link to={'/platforms'} className='flex gap-3 items-center  rounded'>
                                    <div className='p-3 bg-primary-solid rounded'>
                                        <Building strokeWidth={1.7} className='w-6 h-6'/>
                                    </div>
                                    <p className='text-base '>Plataformas</p>
                                </Link>
                                <Link to={'/domains'} className='flex gap-3 items-center  rounded'>
                                    <div className='p-3 bg-primary-solid rounded'>
                                        <AtSign strokeWidth={1.7} className='w-6 h-6'/>
                                    </div>
                                    <p className='text-base'>Dominions</p>
                                </Link>
                                <Link to={'/emails'} className='flex gap-3 items-center  rounded'>
                                    <div className='p-3 bg-primary-solid rounded'>
                                        <Mail strokeWidth={1.7} className='w-6 h-6'/>
                                    </div>    
                                    <p className='text-base '>Emails</p>
                                </Link>
                            </div>
                            <div className='flex items-end w-full text text-sm  flex-1 rounded'>
                                <Link to={'/login'} className='flex gap-3 w-full items-center p-3 rounded'>
                                    <LogOut strokeWidth={1.7} className='w-7 h-7' />
                                    <p className='text-base font-semibold'>Sair</p>
                                </Link>
                            </div>
                        </div>
                    </div>                
                </div>
            </NavBarLateral>        
        </>
    )
}

export default NavBarLateralDefault