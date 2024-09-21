import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import Info from './Info'
import { useDispatch, useSelector } from 'react-redux'
import { getTrasaction } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const HistoryTransactions = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { trasaction } = useSelector((state) => state.user)

  const [history, setHistory] = useState([])
  const [offset, setOffset] = useState(0)
  const [noFoundData, setNoFoundData] = useState(false)
  const [msg, setMsg] = useState('')
  const limit = 5

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const dataParam = { token, offset, limit }

  useEffect(() => {
    dispatch(getTrasaction(dataParam))
  }, [dispatch, offset, limit])

  useEffect(() => {
    if (trasaction && trasaction.data) {
      const data = trasaction.data.records
      if (data.length === 0) {
        setMsg('Maaf tidak ada history transaksi saat ini')
        setNoFoundData(true)
      }
      setHistory(data)
    }
  }, [trasaction])

  const handleShowMore = () => {
    setOffset(offset + limit)
  }

  return (
    <>
      <Navbar />
      <div className='mt-10 px-3 md:px-12 lg:px-16 mb-20'>
        <div className='px-2 md:px-10 lg:px-14'>
          <div className='block md:flex w-full mt-24'>
            <Info />
          </div>

          <div className='mt-10'>
            <h2 className='text-textPrimary font-semibold text-base'>Semua Transaksi</h2>

            {noFoundData ? <p className='text-center mt-20 text-textSecondary font-medium'>{msg}</p> : null}

            {history.map((item) => (
              <div className='w-full border-2 border-gray-200 mt-5 rounded-md shadow-sm' key={item.invoice_number}>
                <div className='flex justify-between px-5 py-2'>
                  <div>
                    <h2 className={`text-lg font-bold ${item.transaction_type === 'TOPUP' ? 'text-green-600' : 'text-red-600'}`}>+ Rp. {item.total_amount}</h2>
                    <p className='text-xs font-medium mt-1 text-textSecondary'>{item.created_on}</p>
                  </div>
                  <div>
                    <h2 className='text-xs text-textPrimary font-medium'>{item.description}</h2>
                  </div>
                </div>
              </div>

            ))}

            {noFoundData ? (
              ''
            ) : (
              <h2 onClick={handleShowMore} className='text-center mt-5 text-red-500 hover:text-red-700 cursor-pointer font-bold text-sm'>Show more</h2>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryTransactions