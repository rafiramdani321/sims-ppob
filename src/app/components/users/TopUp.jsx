import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import Info from './Info'
import { useDispatch, useSelector } from 'react-redux'
import { topUpSaldoUser } from '../../features/user/userSlice'
import AlertSuccess from '../layouts/AlertSuccess'
import AlertErrors from '../layouts/AlertErrors'
import { useNavigate } from 'react-router-dom'
import ModalConfirm from '../layouts/ModalConfirm'
import ModalSuccess from '../layouts/ModalSuccess'
import { data } from 'autoprefixer'

const TopUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { balance } = useSelector((state) => state.user)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const pricesLists = [
    { id: 1, price: '10.000' },
    { id: 2, price: '20.000' },
    { id: 3, price: '50.000' },
    { id: 4, price: '100.000' },
    { id: 5, price: '250.000' },
    { id: 6, price: '500.000' },
    { id: 7, price: '1.000.000' },
  ];

  const [btnActive, setBtnActive] = useState(false)
  const [top_up_amount, setTopUpAmount] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')
  const [modalConfirm, setModalConfirm] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(false)

  const handleChangeNominal = event => {
    setTopUpAmount(event.target.value)
    if (event.target.value === '') return setBtnActive(false)
    setBtnActive(true)
  }

  const handleClickPrice = price => {
    setBtnActive(true)
    setTopUpAmount(price)
  }

  useEffect(() => {
  }, [dispatch, balance, token])

  const handleOpenModalTopUp = () => {
    setModalConfirm(true)
  }

  const handleTopUp = async (event) => {
    event.preventDefault()
    setModalConfirm(false)
    setTopUpAmount('')
    const nominal = parseInt(top_up_amount.replace(/\./g, ''), 10)
    const data = { token, nominal }

    if (data.nominal < 10000 || data.nominal > 1000000) {
      setErrors('Top up harus > 10.000 dan harus < 1.000.000')
      setTimeout(() => {
        setErrors('')
      }, 4000)
      return
    }

    const response = await dispatch(topUpSaldoUser(data))

    if (response.payload.status === 0) {
      setSuccess(response.payload.message)
      setModalSuccess(true)
      setTimeout(() => {
        setSuccess('')
        setModalSuccess(false)
      }, 2000);z
    } else {
      setErrors(response.payload)
      setTimeout(() => {
        setErrors('')
      }, 2000)
    }
  }

  return (
    <>
      <Navbar />
      {modalSuccess ? <ModalSuccess msg={success} /> : null}
      {modalConfirm ? <ModalConfirm name={'anda yakin untuk Top Up sebesar'} nominal={top_up_amount} onConfirm={handleTopUp} onCancel={() => setModalConfirm(false)} /> : null}
      <div className='mt-10 px-3 md:px-12 lg:px-16'>
        <div className='px-2 md:px-10 lg:px-14'>
          <div className='block md:flex w-full mt-24'>
            <Info />
          </div>

          <div className='mt-12 mb-4'>
            <h3 className='text-textPrimary font-medium text-sm'>Silahkan masukan</h3>
            <h1 className='text-textPrimary font-bold text-3xl'>Nominal Top Up</h1>
          </div>

          {errors && <AlertErrors msg={errors} />}

          <div className='mt-8 md:flex'>

            <div className='w-full md:w-3/5 mr-9'>
              <i class={`uil uil-money-withdraw absolute ml-2.5 mt-2 text-gray-400`}></i>
              <input type="email" class="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-sm block w-full p-2.5 px-8" placeholder="masukan minimal Top Up" value={top_up_amount} onChange={handleChangeNominal} required />
              <button onClick={handleOpenModalTopUp} type="submit" className={`w-full text-white font-medium rounded-sm mt-4 text-sm px-5 py-2.5 text-center ${btnActive ? 'bg-bgButton hover:bg-bgHoverButton focus:ring-2 focus:outline-none focus:ring-ringButton cursor-pointer' : 'bg-gray-500'}`} disabled={!btnActive}>Top Up</button>
            </div>

            <div className='w-full md:w-2/5 mt-5 md:mt-0'>
              <div className='flex flex-wrap justify-center md:justify-normal'>

                {pricesLists.map(price => (
                  <div className='w-1/3 md:w-1/2 lg:w-1/4 lg:mr-1 mb-2' key={price.id}>
                    <div onClick={() => handleClickPrice(price.price)} className='border-2 w-24 md:w-30 rounded-md border-gray-200 p-3 cursor-pointer text-textPrimary hover:border-bgButton'>
                      <h1 className='text-center font-medium text-sm'>{price.price}</h1>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

        </div>
      </div>
    </>

  )
}

export default TopUp