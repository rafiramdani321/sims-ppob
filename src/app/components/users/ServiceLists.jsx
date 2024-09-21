import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getService } from '../../features/assets/assetsSlice'
import { Link } from 'react-router-dom'

const ServiceLists = () => {

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { service } = useSelector((state) => state.assets)

  const [serviceLists, setServiceLists] = useState([])

  useEffect(() => {
    dispatch(getService(token))
  }, [dispatch])

  useEffect(() => {
    if (service && service.data) {
      setServiceLists(service.data)
    }
  }, [service])

  return (
    <div className='mt-10'>
      <div className='flex flex-wrap justify-center'>

        {serviceLists.map((service, index) => (
          <div className='w-1/11 mb-5 px-2' key={service.service_code}>
            <Link to={`/payment/${service.service_code}`}>
              <div className='w-full border shadow-md'>
                <img src={service.service_icon} className='w-16' />
              </div>
              <div className='w-16'>
                <h1 className='text-center text-textPrimary font-medium text-xs mt-1'>{service.service_name}</h1>
              </div>
            </Link>
          </div>
        ))}

      </div>
    </div >
  )
}

export default ServiceLists