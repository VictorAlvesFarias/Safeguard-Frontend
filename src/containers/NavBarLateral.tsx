import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavBarLateral({ children,setMobileMenuOpen,mobileMenuOpen }) {
    return (
        <div className='md:h-full'>
            <div className='md:flex hidden h-full'>
                {children}
            </div>
            <div className={`md:hidden fixed z-50 justify-end w-full flex top-0 h-screen transition-all ${mobileMenuOpen ? "right-0" : "right-full"}`}>
                <div className="lg:hidden w-full h-full flex" role="dialog" aria-modal="true">
                    {children}
                    <div onClick={() => setMobileMenuOpen(false)} className='flex-1  pr-12'></div>
                </div>
            </div>
        </div>
    )
}

export default NavBarLateral