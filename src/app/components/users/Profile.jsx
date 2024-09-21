import React, { useEffect, useState } from 'react'
import Navbar from '../layouts/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, updateProfileUser, resetUserSlice, updateProfileImageUser } from '../../features/user/userSlice'
import AlertSuccess from '../layouts/AlertSuccess'
import AlertErrors from '../layouts/AlertErrors'

const Profile = () => {

  // intial
  const { token } = useSelector((state) => state.auth)
  const { user, isError, isSuccess, message } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // state form
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')

  // state action
  const [onEditProfile, setOpnEditProfile] = useState(false)
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')
  const [file, setFile] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  useEffect(() => {
    dispatch(getUserProfile(token))
  }, [dispatch])

  const handleClikImage = () => {
    document.getElementById('fileInput').click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFile(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    if (user && user.data) {
      setFullName(user.data.first_name + ' ' + user.data.last_name)
      setEmail(user.data.email)
      setFirst_name(user.data.first_name)
      setLast_name(user.data.last_name)
    }
  }, [user])

  useEffect(() => {
    dispatch(resetUserSlice())
  }, [token, isSuccess, message, isError, navigate, dispatch])


  const handleEditProfile = async (event) => {
    event.preventDefault()

    const data = { email, first_name, last_name }

    try {

      if (file) {

        const data = { token, file: file }

        const response = await dispatch(updateProfileImageUser({ data }))
        console.log(response)
      }

      const response = await dispatch(updateProfileUser({ token, data }))
      if (response.payload.status === 0) {
        setOpnEditProfile(!onEditProfile)
        setSuccess(response.payload.message)
        setTimeout(() => {
          setSuccess('')
        }, 2000)
      } else {
        setErrors(response.payload)
        setTimeout(() => {
          setErrors('')
        }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-20 md:mt-12">
        <div className="w-full mx-7 lg:w-7/12 md:mt-0 sm:max-w-md xl:p-0">
          <div className=" space-y-4 sm:p-8">

            <div className='flex justify-center mb-3'>
              <input type='file' id='fileInput' className='hidden' onChange={handleFileChange} />
              <img src={file || 'img/Profile Photo.png'} className='w-28 h-28 cursor-pointer rounded-full' onClick={handleClikImage} />
              <div className='absolute border border-gray-400 rounded-full w-7 h-7 mt-20 ml-20 bg-white cursor-pointer'>
                <i className="uil uil-pen text-center block text-textPrimary font-semibold" onClick={handleClikImage}></i>
              </div>
            </div>



            <div className='flex justify-center'>
              <h1 className="text-lg text-center font-bold leading-tight tracking-tight text-textPrimary mb-3">
                {fullName}
              </h1>
            </div>

            <form className="">
              {success && (<AlertSuccess msg={success} />)}
              {errors && (<AlertErrors msg={errors} />)}

              <div className='mb-4'>
                <div>
                  <i className={`uil uil-at absolute ml-2.5 mt-9`}></i>
                  <label className='text-textPrimary font-semibold text-sm'>Email</label>
                  <input type="email" className="bg-gray-50 border border-gray-300 text-textPrimary font-medium sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8 mt-1" defaultValue={email} readOnly />
                </div>
                <div className='mt-4'>
                  <i className={`uil uil-user-circle absolute ml-2.5 mt-9`}></i>
                  <label className='text-textPrimary font-semibold text-sm'>Nama Depan</label>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-textPrimary font-medium sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8 mt-1" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
                </div>
                <div className='mt-4'>
                  <i className={`uil uil-user-circle absolute ml-2.5 mt-9`}></i>
                  <label className='text-textPrimary font-semibold text-sm'>Nama Belakang</label>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-textPrimary font-medium sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8 mt-1" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
                </div>
              </div>
            </form>
            {onEditProfile ? (
              <>
                <button onClick={() => setOpnEditProfile(!onEditProfile)} type="submit" className="w-full text-bgButton bg-white border border-bgButton hover:border-red-800 hover:right-1 focus:ring-2 focus:outline-none focus:ring-ringButton font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>

                <button onClick={handleEditProfile} type="submit" className="w-full text-white bg-bgButton hover:bg-bgHoverButton focus:ring-2 focus:outline-none focus:ring-ringButton font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-20">Simpan</button>
              </>
            ) : (
              <>
                <button type='submit' onClick={() => setOpnEditProfile(!onEditProfile)} className="w-full text-bgButton bg-white border border-bgButton hover:border-red-800 hover:right-1 focus:ring-2 focus:outline-none focus:ring-ringButton font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit Profile</button>

                <button onClick={onLogout} type="submit" className="w-full text-white bg-bgButton hover:bg-bgHoverButton focus:ring-2 focus:outline-none focus:ring-ringButton font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 mb-20">Logout</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile