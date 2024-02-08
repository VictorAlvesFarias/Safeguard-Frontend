import React from 'react'
import LateralTemplate from '../containers/LateralTemplate'
import NavBarLateralDefault from '../styled-containers/NavBarLateralDefault'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Domains from './Domains';
import Accounts from './Accounts';
import Emails from './Emails';

function Home() {
  return (
      <LateralTemplate className={"bg-zinc-200"}>
        <NavBarLateralDefault/>
        <div className='w-full h-full md:pl-0 p-3'>
          <div className='w-full h-full rounded flex justify-center items-center '>
              <Routes>
                <Route path="/domains" element={<Domains/>} />
                <Route path="/accounts" element={<Accounts/>} />
                <Route path="/emails" element={<Emails/>} />
              </Routes>  
          </div>
        </div>  
      </LateralTemplate>
  )
}

export default Home