"use client"

import { useEffect, useState } from 'react'
import React from 'react';
import Container from './Container';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import Locale from '@/components/Locale';
import Dictionaries from '../dictionaries/navbar.json'
import useClientInter from '@/utils/hooks/useClientInter';
import Anch from './Anch';
import type { Languages } from '../i18n.config';
import Gradientline from './Gradientline';
import ToggleTheme from './ToggleTheme';

function Navbar() {

  const [navStyle, setNavStyle] = useState(false);

  const [mobileMenuOpen,setMobileMenuOpen] = useState(false)

  const [mobileMenuLanguage, setMobileMenuLanguage] = useState(false)

  useEffect(() => {
    const handleScroll:any = () => {
      if (window.scrollY > 50 && !navStyle) {
        setNavStyle(true);
      } else if (window.scrollY <= 50 && navStyle) {
        setNavStyle(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navStyle]);

  const language: Languages = useClientInter()

  const texts =  Dictionaries[language]

  return (
    <React.Fragment>
      <header className={`fixed w-screen transition flex top-0 left-0 justify-center items-center z-30 dark:text-zinc-50 ${navStyle ? ' bg-zinc-50 shadow-lg  dark:bg-zinc-900 ' :' '}`}>
        <Container>
          <nav className="flex items-center justify-between lg:justify-center h-20 gap-x-12 font-light">
              <div className="hidden lg:block">
                <Anch href="/#about-me" className={`text-md leading-6`}>{texts.aboutMe}</Anch>
                <Gradientline/>
              </div>
              <div className="hidden lg:block">
                <Anch href="/projects" className={`text-md leading-6`}>{texts.jobs}</Anch>
                <Gradientline/>
              </div>
              <div className="hidden lg:block">
                <Anch href="/technologies" className={`text-md leading-6`}>{texts.technologies}</Anch>
                <Gradientline/>
              </div>
              <DropdownMenu.Root >
                <DropdownMenu.Trigger asChild>
                  <div className="hidden lg:block">
                    <button className={`flex justify-center items-center text-md leading-6`} aria-label="Customise options">
                      {texts.language}
                    </button>
                    <Gradientline/>
                  </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className={`DropdownMenuContent mt-6 w-32 dark:bg-zinc-900 dark:tezt bg-zinc-50 lg:shadow-lg flex flex-col`} sideOffset={5}>
                    <DropdownMenu.Item className={`hover:bg-zinc-300 p-3 focus-visible:outline-none ${navStyle ? 'text-md leading-6' : 'dark:text-gray-300'}`}>
                      <Locale href="pt-br">Português</Locale>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={`hover:bg-zinc-300 p-3 focus-visible:outline-none ${navStyle ? 'text-md leading-6' : 'dark:text-gray-300'}`}>
                      <Locale href="en-us">English</Locale>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <div className="lg:block">
                <ToggleTheme/>
                <Gradientline/>
              </div>
              <button type="button" onClick={()=>setMobileMenuOpen(true)}  className={`lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-all text-gray-700 `}>
                <span className="sr-only">Open main menu</span>
                <svg className={"h-7 w-9 text-yellow-50 stroke-black dark:stroke-white" }fill="none" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

          </nav>
        </Container>

      </header>
    </React.Fragment>
  )
}

export default Navbar
