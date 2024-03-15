import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { domainActions } from '../slices/DomainSlice';
import { emailActions } from '../slices/EmailSlice';
import { DomainService } from '../services/DomainService';
import { EmailService } from '../services/EmailService';
import { AccountService } from '../services/AccountService';
import { useDispatch } from 'react-redux';
import { accountActions } from '../slices/AccountSlice';
import { PlatformService } from '../services/PlatformService';
import { platformActions } from '../slices/PlatformSlice';
import AccountView from './AccountView';
import ManagerDomain from './ManagerDomain';
import ManagerEmail from './ManagerEmail';
import ManagerAccount from './ManagerAccount';
import Platforms from '../pages/Platforms'
import ManagerPlatforms from './ManagerPlatforms';
import Domains from './Domains';
import Accounts from './Accounts';
import Emails from './Emails';
import LateralTemplate from '../containers/LateralTemplate'
import NavBarLateralDefault from '../styled-containers/NavBarLateralDefault'

function Home() 
{
  const domainService = new DomainService()
  const emailService = new EmailService()
  const platformService = new PlatformService()
  const accountService = new AccountService()
  const dispatch = useDispatch()

  async function handleGetAccounts() {
    await accountService.GetAll()
    .then((r)=>{
      dispatch(accountActions.set(r))
    })
  }

  async function handleGetEmails() {
    await emailService.GetAll()
    .then((r)=>{
      dispatch(emailActions.set(r))
    })
  }

  async function handleGetDomains() {
    await domainService.GetAll()
    .then((r)=>{
      dispatch(domainActions.set(r))
    })
  }

  async function handleGetPlatform() {
    await platformService.GetAll()
    .then((r)=>{
      dispatch(platformActions.set(r))
    })
  }

  useEffect(() => {
    handleGetDomains()
    handleGetAccounts()
    handleGetEmails()
    handleGetPlatform()
  }, [])
  
  return (
      <LateralTemplate className={"bg-secundary"}>
        <NavBarLateralDefault/>
        <div className='w-full h-full md:pl-0 p-2'>
          <div className='w-full h-full rounded flex justify-center items-center '>
              <Routes>
                <Route path="/domains/manager/:id" element={<ManagerDomain/>} />
                <Route path="/emails/manager/:id" element={<ManagerEmail/>} />
                <Route path="/accounts/manager/:id" element={<ManagerAccount/>} />
                <Route path="/platforms/manager/:id" element={<ManagerPlatforms/>} />
                <Route path="/accounts" element={<Accounts/>} />
                <Route path="/emails" element={<Emails/>} />
                <Route path="/domains" element={<Domains/>} />
                <Route path="/platforms" element={<Platforms/>} />
              </Routes>  
          </div>
        </div>  
      </LateralTemplate>
  )
}

export default Home