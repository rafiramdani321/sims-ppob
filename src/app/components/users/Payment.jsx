import React, { useState, useEffect } from 'react'
import Info from './Info'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, getUserSaldo, paymentUser } from '../../features/user/userSlice'
import { getService } from '../../features/assets/assetsSlice'
import Navbar from '../layouts/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import AlertSuccess from '../layouts/AlertSuccess'
import AlertErrors from '../layouts/AlertErrors'
import ModalConfirm from '../layouts/ModalConfirm'
import ModalSuccess from '../layouts/ModalSuccess'

const payment = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { token } = useSelector((state) => state.auth)
  const { user, balance } = useSelector((state) => state.user)
  const { service } = useSelector((state) => state.assets)

  const [tarif, setTarif] = useState(null)
  const [serviceName, setServiceName] = useState('')
  const [serviceCode, setServiceCode] = useState('')
  const [serviceIcon, setServiceIcon] = useState('')
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')
  const [modalConfirm, setModalConfirm] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  useEffect(() => {
    dispatch(getService(token))
    dispatch(getUserSaldo(token))
  }, [dispatch, balance, user])

  useEffect(() => {
    if (service && service.data) {
      const services = service.data
      const data = services.find((item) => item.service_code === params.layanan)
      if (data) {
        setTarif(data.service_tariff)
        setServiceName(data.service_name)
        setServiceCode(data.service_code)
        setServiceIcon(data.service_icon)
      }
    }
  }, [service])

  const handleOpenModalConfirm = () => {
    setModalConfirm(true)
  }

  const handlePayment = async (event) => {
    event.preventDefault()
    setModalConfirm(false)
    const data = { token, serviceCode }

    const response = await dispatch(paymentUser(data))
    if (response.payload.status === 0) {
      setSuccess(response.payload.message)
      setModalSuccess(true)
      setTimeout(() => {
        setSuccess('')
        setModalSuccess(false)
      }, 2000);
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
      {modalConfirm ? <ModalConfirm onConfirm={handlePayment} onCancel={() => setModalConfirm(false)} nominal={tarif} name={serviceName} /> : null}
      {modalSuccess ? <ModalSuccess msg={success} name={serviceName} nominal={`Rp${tarif}`} /> : null}
      <div className='mt-10 px-3 md:px-12 lg:px-16'>
        <div className='px-2 md:px-10 lg:px-14'>
          <div className='block md:flex w-full mt-24'>
            <Info />
          </div>

          <div className='mt-12 mb-4 flex'>
            <img src={serviceIcon} />
            <div>
              <h3 className='text-textPrimary font-medium text-sm'>Pembayaran</h3>
              <h1 className='text-textPrimary font-bold text-3xl'>{serviceName}</h1>
            </div>
          </div>

          {errors && <AlertErrors msg={errors} />}

          <div className='mt-8 md:flex'>

            <div className='w-full md:w-3/5 mr-9'>
              <i className={`uil uil-money-withdraw absolute ml-2.5 mt-2 text-gray-400`}></i>
              <input type="email" className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-sm block w-full p-2.5 px-8" defaultValue={tarif} readOnly />
              <button onClick={handleOpenModalConfirm} type="submit" className={`w-full text-white font-medium rounded-sm mt-4 text-sm px-5 py-2.5 text-center bg-bgButton hover:bg-bgHoverButton focus:ring-2 focus:outline-none focus:ring-ringButton cursor-pointer`}>Bayar</button>
            </div>

            <div className='w-full md:w-2/5 mt-5 md:mt-0'>
              <div className='flex flex-wrap justify-center md:justify-normal'>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default payment