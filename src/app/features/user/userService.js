import { data } from "autoprefixer";
import axios from "axios";

// GET PROFILE
const getProfile = async (token) => {
  const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/profile', {
    headers: { Authorization: `Bearer ${token}` }
  })

  return response.data
}

// GET Saldo
const getSaldo = async (token) => {
  const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/balance', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

const updateProfile = async (token) => {
  const response = await axios.put('https://take-home-test-api.nutech-integrasi.app/profile/update', token.data, {
    headers: {
      Authorization: `Bearer ${token.token}`
    }
  })
  console.log(response)
  return response.data
}

const updateProfileImage = async (data) => {
  const response = await axios.put('https://take-home-test-api.nutech-integrasi.app/profile/image', data.data.file, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${data.data.token}`
    }
  })
  return response.data
}

const topUpSaldo = async (data) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.app/topup', ({ top_up_amount: data.nominal }), {
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  })
  return response.data
}

const payment = async (data) => {
  const response = await axios.post('https://take-home-test-api.nutech-integrasi.app/transaction', ({ service_code: data.serviceCode }), {
    headers: {
      Authorization: `Bearer ${data.token}`
    }
  })
  return response.data
}

const trasactionHistory = async (dataParam) => {
  const response = await axios.get(`https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${dataParam.offset}&limit=${dataParam.limit}`, {
    headers: {
      Authorization: `Bearer ${dataParam.token}`
    }
  })
  return response.data
}

const userService = { getProfile, getSaldo, updateProfile, topUpSaldo, updateProfileImage, payment, trasactionHistory }

export default userService