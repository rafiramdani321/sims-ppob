import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [showMenuNav, setShowMenuNav] = useState(false)

  return (
    <nav className='px-3 md:px-12 lg:px-16 fixed w-full top-0 bg-white z-50'>
      <div className='flex px-2 md:px-10 lg:px-14 border-b-2 border-gray-200 mt-3'>
        <div className='flex w-1/2 justify-start mb-3'>
          <Link to={'/'} className='flex'>
            <img src='/img/Logo.png' className="mr-1 md:mr-2 w-6 h-6 lg:w-8 lg:h-8 mt-2"></img>
            <h1 className='mt-2.5 md:mt-1.5 lg:mt-2.5 font-bold text-sm md:text-xl text-textPrimary'>SIMS PPOB</h1>
          </Link>
        </div>


        <div className='flex w-1/2 justify-end mb-3'>

          <button className={`md:hidden cursor-pointer p-2 text-base mt-1 text-textPrimary hover:text-bgHoverButton ${showMenuNav ? 'focus:outline-none focus:ring-2 focus:ring-red-300 rounded-md' : null} `} onClick={() => setShowMenuNav(!showMenuNav)}>
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={showMenuNav ? 'bottom-0 fixed w-full bg-zinc-50 px-8 py-4 border rounded-lg shadow-inner left-0 md:flex md:bottom-3/4 md:bg-transparent md:-top-2 lg:-ml-[128px] md:justify-end lg:fixed md:border-none md:shadow-none' : 'md:block hidden'}>

            <ul className='md:flex md:gap-8 grid gap-8 grid-cols-3 mb-2 md:py-0 mt-3'>
              <li className='text-textPrimary hover:text-textHover'>
                <Link to={'/topup'} className='block text-center font-medium text-xs md:text-xs lg:text-sm'>
                  <i className='uil uil-money-withdraw block text-2xl md:hidden'></i> Top Up
                </Link>
              </li>
              <li className='text-textPrimary hover:text-textHover'>
                <Link to={'/transaction'} className='block text-center font-medium text-xs md:text-xs lg:text-sm'>
                  <i className='uil uil-clipboard-alt block text-2xl md:hidden'></i> Transaction
                </Link>
              </li>
              <li className='text-textPrimary hover:text-textHover'>
                <Link to={'/profile'} className='block text-center font-medium text-xs md:text-xs lg:text-sm'>
                  <i className='uil uil-user-circle block text-2xl md:hidden'></i> Akun
                </Link>
              </li>

            </ul>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar