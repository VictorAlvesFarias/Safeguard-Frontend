import React, { useState } from 'react'
import NavBarLateral from '../containers/NavBarLateral'
import { Link } from 'react-router-dom'
import profileIcon from '../assets/profile.svg'
import emailIcon from '../assets/email.svg'
import domainIcon from '../assets/domain.svg'
import exitIcon from '../assets/exit.svg'
import homeIcon from '../assets/home.svg'

function NavBarLateralDefault() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <div className='md:hidden z-10 fixed top-0 left-0 '>
                <button type="button" onClick={() => setMobileMenuOpen(true)} className={` flexitems-center justify-center rounded p-6 transition-all text-gray-700 `}>
                    <svg className={"h-7 w-9 text-yellow-50 stroke-black dark:stroke-white"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
            <NavBarLateral 
                setMobileMenuOpen={setMobileMenuOpen}
                mobileMenuOpen={mobileMenuOpen}
            >
                <div className='md:p-2 gap-3 w-60 h-full'>
                    <div className='flex flex-col shadow-lg rounded bg-primary h-full p-3 '>
                        <div className='flex w-full md:hidden justify-end '>
                            <button onClick={() => setMobileMenuOpen(false)} type="button" className="relative right-0">
                                Voltar
                            </button>
                        </div>
                        <h1 className=' text-2xl ml-3 mb-10'>Safeguard</h1>
                        <div className='flex flex-col gap-3 text-sm'>
                            <Link to={'/accounts'} className='flex gap-3 items-center font-semibold hover:bg-fort  p-3 rounded'>
                                <img className='w-7' src={profileIcon} alt="" />
                                <p>Contas</p>
                            </Link>
                            <Link to={'/domains'} className='flex gap-3 items-center font-semibold hover:bg-fort  p-3 rounded'>
                                <img className='w-7' src={domainIcon} alt="" />
                                <p>Dominions</p>
                            </Link>
                            <Link to={'/emails'} className='flex gap-3 items-center font-semibold hover:bg-fort  p-3 rounded'>
                                <img className='w-7' src={emailIcon} alt="" />
                                <p>E-Mails</p>
                            </Link>
                        </div>
                        <div className='flex flex-1 items-end w-full text text-sm'>
                            <Link to={'/login'} className='flex gap-3 w-full items-center hover:bg-fort  p-3 rounded'>
                                <img className='w-7' src={exitIcon} alt="" />
                                <p>Logout</p>
                            </Link>
                        </div>
                    </div>                
                </div>
            </NavBarLateral>        
        </>
    )
}

export default NavBarLateralDefault