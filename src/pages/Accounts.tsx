import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchDefault from '../styled-components/SearchDefault';
import Color from 'color-thief-react';

function Accounts() {
  const accounts: any = useSelector(({ account }: any) => account.value)

  return (
    <div className='bg-fort w-full h-full flex-col overflow-auto rounded'>
      <div className='flex w-full px-6 pt-6 gap-6 flex-wrap'>
        <div className='flex-1 min-w-fit'>
          <SearchDefault
            placeholder={"Pesquisar conta"}
          />
        </div>
        <Link className=' w-fit whitespace-nowrap cursor-pointer text-black font-semibold text-center center  bg-white p-1.5 px-3 rounded-full top-0 left-0 text-sm' to={'create'}>Cadastrar Conta</Link>
      </div>
      <div className='grid sm:grid-cols-2 xl:grid-cols-3 h-fit gap-3 p-6'>
        {accounts.map(x =>
          <Color src={x.platform.image} format="hex">
            {({ data, loading, error }) => (
              <Link to={'manager/'+x.id}>
                <div className={"transition-all  " + (data ? 'flex mb-3 gap-3 h-48 rounded items-center overflow-hidden p-3 opacity-100' : "opacity-0")} style={{ background: data }}>
                    <div className='flex flex-wrap flex-col flex-1 '>
                      <p className='font-bold text-2xl'>{x.platform.name.toUpperCase()}</p>
                      <p className='font-bold text-sm'>{x.name.toUpperCase()}</p>
                      <p className='font-semibold text-sm'>{x.email.username}{x.email.provider.signature}</p>
                    </div>
                </div>
              </Link>
            )}
          </Color>
        )}
      </div>
    </div>
  )
}

export default Accounts