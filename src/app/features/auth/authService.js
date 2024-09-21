import axios from "axios";

// REGISTER USER
const register = async (userData) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.app/registration', userData)
  return response.data
}

// LOGIN USER
const login = async (userData) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.app/login', userData)

  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data.data.token))
  }
  return response.data
}

// LOGOUT USER
const logout = async () => {
  localStorage.removeItem('token')
}

const authService = { register, login, logout }

export default authService