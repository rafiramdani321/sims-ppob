import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../features/auth/authSlice'
import AlertErrors from '../layouts/AlertErrors'
import AlertSuccess from '../layouts/AlertSuccess'

const Login = () => {

  // initial
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, isError, isSuccess, message } = useSelector((state) => state.auth)

  // State Form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // State Action
  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [success, setSuccess] = useState('')
  const [errors, setErrors] = useState('')


  // Handle Onchange Form
  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {
    if (isError) {
      setErrors(message)
    }

    if (isSuccess || token) {
      window.location.reload()
      navigate('/')
    }

    dispatch(reset())
  }, [token, isError, isSuccess, message, navigate, dispatch])

  const handleLogin = (event) => {
    event.preventDefault()

    const userData = { email, password }
    dispatch(login(userData))
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
                Masuk atau buat akun untuk memulai
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">

              {success && <AlertSuccess msg={success} />}
              {errors && <AlertErrors msg={errors} />}

              <div>
                <i className={`uil uil-at absolute ml-2.5 mt-2 ${email && 'text-textPrimary'} text-gray-400`}></i>
                <input type="email" className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8" placeholder="masukan email anda" required="" value={email} onChange={handleChangeEmail} />
              </div>
              <div className='flex'>
                <i className={`uil uil-padlock absolute ml-2.5 mt-2 ${password && 'text-textPrimary'} text-gray-400`}></i>
                <input type={!hiddenPassword ? 'text' : 'password'} className="bg-gray-50 border border-gray-300 text-textPrimary sm:text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 px-8" placeholder="buat password" required="" value={password} onChange={handleChangePassword} />
                <div className='flex'>
                  <i onClick={() => setHiddenPassword(!hiddenPassword)} className={`uil uil-eye absolute -ml-7 mt-2 ${!hiddenPassword ? 'text-textPrimary' : 'text-gray-400'} cursor-pointer`}></i>
                </div>
              </div>

              <button type="submit" className="w-full text-white bg-bgButton hover:bg-bgHoverButton focus:ring-2 focus:outline-none focus:ring-ringButton font-medium rounded-lg text-sm px-5 py-2.5 text-center">Masuk</button>
              <p className="text-sm font-normal text-center text-textPrimary">
                belum punya akun? registrasi <Link to="/registration" className="font-medium text-bgButton hover:underline">di sini</Link>
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

export default Login