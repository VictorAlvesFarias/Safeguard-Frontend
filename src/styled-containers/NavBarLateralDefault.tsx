import React, { useState } from 'react'
import NavBarLateral from '../containers/NavBarLateral'
import { Link } from 'react-router-dom'
import profileIcon from '../assets/profile.svg'
import emailIcon from '../assets/email.svg'
import domainIcon from '../assets/domain.svg'
import exitIcon from '../assets/exit.svg'
import homeIcon from '../assets/home.svg'
import { FileStack, Home, LogOut } from 'lucide-react'

function NavBarLateralDefault() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <div className='md:hidden z-10 top-0 left-0 bg-secundary-solid m-2 rounded  flex items-center'>
                <button type="button" onClick={() => setMobileMenuOpen(true)} className={` flex first-line:items-center justify-center rounded p-6 transition-all text-gray-700 `}>
                    <svg className={"h-7 w-9 text-yellow-50 stroke-black dark:stroke-white"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <p className='font-semibold text-lg'>Safeguard</p>
            </div>
            <NavBarLateral 
                setMobileMenuOpen={setMobileMenuOpen}
                mobileMenuOpen={mobileMenuOpen}
            >
                <div className='md:p-2 gap-3 w-60 h-full'>
                    <div className='flex flex-col shadow-lg rounded bg-fort h-full p-3 py-6 '>
                        <div className='flex w-full md:hidden justify-end '>
                            <button onClick={() => setMobileMenuOpen(false)} type="button" className="relative right-0">
                                Voltar
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 text-sm'>
                            <Link to={'/accounts'} className='flex gap-3 items-center font-semibold hover:bg-fort  p-3 rounded'>
                                <Home strokeWidth={1.7} className='w-7 h-7'/>
                                <p className='text-base font-semibold'>Home</p>
                            </Link>
                            <Link to={'/registrations'} className='flex gap-3 items-center font-semibold hover:bg-fort  p-3 rounded'>
                                <FileStack strokeWidth={1.7} className='w-7 h-7'/>
                                <p className='text-base font-semibold'>Cadastros</p>
                            </Link>
                        </div>
                        <div className='flex flex-1 items-end w-full text text-sm'>
                            <Link to={'/login'} className='flex gap-3 w-full items-center hover:bg-fort  p-3 rounded'>
                                <LogOut strokeWidth={1.7} className='w-7 h-7' />
                                <p className='text-base font-semibold'>Sair</p>
                            </Link>
                        </div>
                    </div>                
                </div>
            </NavBarLateral>        
        </>
    )
}

export default NavBarLateralDefault