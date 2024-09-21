import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import ServiceLists from './ServiceLists'
import Banner from './Banner'
import Info from './Info'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  return (
    <>
      <Navbar />
      <div className='mt-10 px-3 md:px-12 lg:px-16'>
        <div className='px-2 md:px-10 lg:px-14'>
          <div className='block md:flex w-full mt-24'>
            <Info />
          </div>
          <ServiceLists />
          <Banner />
        </div>
      </div>
    </>
  )
}

export default Home