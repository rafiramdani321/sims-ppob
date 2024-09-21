import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBanner } from '../../features/assets/assetsSlice'

const Banner = () => {

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { banner } = useSelector((state) => state.assets)

  const [bannerLists, setBannerList] = useState([])

  useEffect(() => {
    dispatch(getBanner(token))
  }, [dispatch])

  useEffect(() => {
    if (banner && banner.data) {
      setBannerList(banner.data)
    }
  }, [banner])

  return (
    <div className='mt-8'>
      <h1 className='text-textPrimary font-semibold text-base'>Temukan promo menarik</h1>

      <div className='flex flex-wrap justify-between mt-3'>

        {bannerLists.map((banner) => (
          <div className='w-1/2 md:w-1/4 p-1' key={banner.banner_name}>
            <div className='w-fit rounded-md border shadow-md'>
              <img src={banner.banner_image} className='w-60' />
            </div>
          </div>
        ))}


      </div>
    </div>
  )
}

export default Banner