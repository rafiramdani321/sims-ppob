
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, getUserSaldo } from '../../features/user/userSlice'

const Info = () => {

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { user, balance } = useSelector((state) => state.user)

  const [name, setName] = useState('')
  const [saldo, setSaldo] = useState('')
  const [hiddenSaldo, setHiddenSaldo] = useState(true)

  useEffect(() => {
    dispatch(getUserProfile(token))
    dispatch(getUserSaldo(token))
  }, [dispatch])

  useEffect(() => {
    if (user && user.data) {
      setName(user.data.first_name + ' ' + user.data.last_name)
    }
    if (balance && balance.data) {
      setSaldo(balance.data.balance)
    }
  }, [user, balance])

  return (
    <>
      <div className='w-full md:w-1/2 md:mr-5'>
        <img src='img/Profile Photo.png' />
        <h1 className='text-textPrimary font-semibold text-xl mt-4'>Selamat datang,</h1>
        <h1 className='text-textPrimary font-bold text-2xl'>{name}</h1>
      </div>

      <div className='w-full mt-5 md:mt-0 md:w-1/2'>
        <div className='bg-bgButton p-6 rounded-lg'>
          <h1 className='text-white font-normal text-base'>Saldo anda</h1>
          <div className='flex'>
            <h1 className='mt-3.5 text-white font-bold text-3xl mr-1.5'>Rp</h1>
            <input type={`${hiddenSaldo ? 'password' : 'text'}`} className='text-white bg-transparent font-bold text-3xl mt-4' defaultValue={saldo} />
          </div>
          <h3 onClick={() => setHiddenSaldo(!hiddenSaldo)} className='text-white block font-normal text-sm mt-3 cursor-pointer w-fit'>Lihat Saldo
            <i className={`uil uil-eye mt-3 text-white ml-1.5`}></i>
          </h3>
        </div>
      </div>
    </>

  )
}

export default Info