import { AtSignIcon, ChevronDown, ChevronLeft, Circle, CircleUser, CircleUserRound, LucideMenu, MailsIcon, NetworkIcon, Router, User, UserRound, UsersIcon } from "lucide-react";
import React, { useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/auth-context";
import SidebarRoot from "../components/sidebar-root";
import SidebarHref from "../components/sidebar-href";
import SidebarMenu from "../components/sidebar-menu";
import SidebarItem from "../components/sidebar-item";
import SidebarContent from "../components/sidebar-content";
import SidebarHamburguer from "../components/sidebar-hamburguer";
import If from "../base-components/if";
import AccordionTitle from "../components/accordion-title";
import Accordion from "../components/accordion";
import AccordionRoot from "../components/accordion-root";
import { useAppSelector } from "../utils/hooks/redux-hooks";
import Cookies from 'js-cookie';
import SidebarContext from "../base-components/sidebar-context";
import { USER_ROUTES } from "../config/routes-config";
import AccordionContext from "../base-components/accordion-context";
import ModalContext from '../base-components/modal-context'
import ModalRoot from '../components/modal-root'
import ModalOpen from '../base-components/modal-open'
import ModalClose from '../base-components/modal-close'
import Button from '../components/button'
import Providers from "../pages/user/providers/providers";
import Platforms from "../pages/user/platforms/platforms";
import ProvidersManeger from "../pages/user/providers-maneger/providers-maneger";
import PlatformsManeger from "../pages/user/platforms-maneger/platforms-maneger";
import Emails from "../pages/user/emails/emails";
import EmailsManeger from "../pages/user/emails-maneger/emails-maneger";
import AccountsManeger from "../pages/user/accounts-maneger/accounts-maneger";
import Accounts from "../pages/user/accounts/accounts";

function UserRouters() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate()
  const title = useAppSelector(e => e.app.value.title)
  const cookies = Cookies.get();

  return (
    <If conditional={isAuthenticated}>
      <SidebarContext>
        <SidebarRoot>
          <SidebarMenu>
            <SidebarItem href={USER_ROUTES.PROFILE}>
              <div className="flex gap-3 items-start flex-col">
                <div className="flex gap-3 items-center">
                  <CircleUser className="w-7 h-7"></CircleUser>
                  <span className="overflow-auto text-ellipsis">
                    <p>
                      {cookies.name ?? "Nome não encontrado"}
                    </p>
                  </span>
                </div>
              </div>
            </SidebarItem>
            <SidebarItem href={USER_ROUTES.ACCOTUNS}>
              <SidebarHref><UsersIcon />Contas</SidebarHref>
            </SidebarItem>
            <SidebarItem href={USER_ROUTES.DOMAINS}>
              <SidebarHref><AtSignIcon /> Dominios</SidebarHref>
            </SidebarItem>
            <SidebarItem href={USER_ROUTES.EMAILS}>
              <SidebarHref><MailsIcon />E-mails</SidebarHref>
            </SidebarItem>
            <SidebarItem href={USER_ROUTES.PLATFORMS}>
              <SidebarHref><NetworkIcon />Platformas</SidebarHref>
            </SidebarItem>
            <ModalContext>
              <div className="flex-1 flex items-end w-full">
                <ModalOpen className="w-full h-fit">
                  <SidebarItem unselectable disable href="" >
                    <SidebarHref >Exit </SidebarHref>
                  </SidebarItem>
                </ModalOpen>
              </div>
              <ModalRoot>
                <div className='shadow-lg p-6 bg-zinc-200 flex flex-col gap-3 rounded border border-zinc-400'>
                  <p>Tem certeza que deseja sair?</p>
                  <div className='flex justify-between w-full mt-6 gap-3'>
                    <ModalClose callback={logout} className='flex justify-between flex-1'>
                      <Button>Sair</Button>
                    </ModalClose>
                    <ModalClose className='flex justify-between flex-1'>
                      <Button variation='red'>Cancelar</Button>
                    </ModalClose>
                  </div>
                </div>
              </ModalRoot>
            </ModalContext>
          </SidebarMenu>
          <SidebarHamburguer>
            <div className=" z-30 h-12 justify-end top-0 left-0  flex w-full bg-main-black-900 px-6  items-center ">
              <LucideMenu className="w-7 h-7 text-zinc-400" />
            </div>
          </SidebarHamburguer>
          <SidebarContent>
            <Routes>
              <Route path={USER_ROUTES.ACCOTUNS} element={<Accounts />} />
              <Route path={USER_ROUTES.MANAGER_ACCOUNTS} element={<AccountsManeger />} />
              <Route path={USER_ROUTES.DOMAINS} element={<Providers />} />
              <Route path={USER_ROUTES.MANAGER_DOMAINS} element={<ProvidersManeger />} />
              <Route path={USER_ROUTES.PLATFORMS} element={<Platforms />} />
              <Route path={USER_ROUTES.MANAGER_PLATFORMS} element={<PlatformsManeger />} />
              <Route path={USER_ROUTES.EMAILS} element={<Emails />} />
              <Route path={USER_ROUTES.MANAGER_EMAILS} element={<EmailsManeger />} />
            </Routes>
          </SidebarContent>
        </SidebarRoot>
      </SidebarContext>
    </If>
  );
}

export default UserRouters;
