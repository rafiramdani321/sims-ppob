import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import AlertErrors from '../layouts/AlertErrors'
import AlertSuccess from '../layouts/AlertSuccess'

const Registration = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

  // State Form
  const [email, setEmail] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // State Action
  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true)
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')

  // Handle Onchange Form
  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleChangeFirstName = event => {
    setFirst_name(event.target.value)
  }

  const handleChangeLastName = event => {
    setLast_name(event.target.value)
  }

  const handleChangePassword = event => {
    setPassword(event.target.value)
  }

  const handleChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }

    if (isError) {
      setErrors(message)
    }

    if (isSuccess || user) {
      setSuccess(message)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleRegistration = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setErrors('password tidak sama')
    } else {
      const userData = { email, first_name, last_name, password }
      dispatch(register(userData))
    }
  }


  return (
    <section className="bg-gray-50">
      <div className="flex items-center justify-center px-0 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full mx-7 lg:w-1/3 md:mt-0 sm:max-w-md xl:p-0">
          <div className=" space-y-4 md:space-y-6 sm:p-8">

            <div className='flex justify-center'>
              <img src='img/Logo.png' className='mr-1 w-5 h-5 mt-0.5' />
              <h3 className='text-center text-textPrimary font-bold'>
                SIMS PPOB</h3>
            </div>

            <div className='flex justify-center'>
              <h1 className="text-lg w-1/2 text-center font-bold leading-tight tracking-tight text-textPrimary mb-5">
                Lengkapi data untuk membuat akun
              </h1>
            </div>

            <form onSubmit={handleRegistration} className="space-y-4 md:space-y-6" action="#">

              {success && (<AlertSuccess msg={success} />)}
              {errors && (<AlertErrors msg={errors} />)}

              <div>
                <i className={`uil uil-at absolute ml-2.5 mt-2 ${email && 'text-textPrimary'} text-gray-400`}></i>
                <input type="email" className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8" placeholder="masukan email anda" required="" value={email} onChange={handleChangeEmail} />
              </div>

              <div>
                <i className={`uil uil-user-circle absolute ml-2.5 mt-2 ${first_name && 'text-textPrimary'} text-gray-400`}></i>
                <input type="text" className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8" placeholder="nama depan" required="" value={first_name} onChange={handleChangeFirstName} />
              </div>

              <div className=''>
                <i className={`uil uil-user-circle absolute ml-2.5 mt-2 ${last_name && 'text-textPrimary'} text-gray-400`}></i>
                <input type="text" className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8" placeholder="nama belakang" required="" value={last_name} onChange={handleChangeLastName} />
              </div>

              <div className='flex'>
                <i className={`uil uil-padlock absolute ml-2.5 mt-2 ${password && 'text-textPrimary'} text-gray-400`}></i>
                <input type={!hiddenPassword ? 'text' : 'password'} className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8" placeholder="buat password" required="" value={password} onChange={handleChangePassword} />
                <div className='flex'>
                  <i onClick={() => setHiddenPassword(!hiddenPassword)} className={`uil uil-eye absolute -ml-7 mt-2 ${!hiddenPassword ? 'text-textPrimary' : 'text-gray-400'} cursor-pointer`}></i>
                </div>
              </div>

              <div className='flex'>
                <i className={`uil uil-padlock absolute ml-2.5 mt-2 ${confirmPassword && 'text-textPrimary'} text-gray-400`}></i>
                <input type={!hiddenConfirmPassword ? 'text' : 'password'} className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8" placeholder="konfirmasi password" value={confirmPassword} onChange={handleChangeConfirmPassword} />
                <div className='flex'>
                  <i onClick={() => setHiddenConfirmPassword(!hiddenConfirmPassword)} className={`uil uil-eye absolute -ml-7 mt-2 ${!hiddenConfirmPassword ? 'text-textPrimary' : 'text-gray-400'} cursor-pointer`}></i>
                </div>
              </div>

              <button type="submit" className="w-full text-white bg-bgButton hover:bg-bgHoverButton focus:ring-2 focus:outline-none focus:ring-ringButton font-medium rounded-lg text-sm px-5 py-2.5 text-center">Registrasi</button>
              <p className="text-sm font-normal text-center text-textPrimary">
                sudah punya akun? login <Link to="/login" className="font-medium text-bgButton hover:underline">di sini</Link>
              </p>
            </form>
          </div>
        </div>
        <div className="w-1/3 mt-0 max-w-md p-0 hidden md:block">
          <img src='img/Illustrasi Login.png' />
        </div>
      </div>
    </section>
  )
}

export default Registration