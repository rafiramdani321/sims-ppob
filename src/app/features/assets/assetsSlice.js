import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  banner: null,
  service: [],
  serviceByName: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// GET User
export const getBanner = createAsyncThunk('assest/banner', async (token, thunkAPI) => {
  try {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/banner', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// GET Service
export const getService = createAsyncThunk('assest/service', async (token, thunkAPI) => {
  try {
    const response = await axios.get('https://take-home-test-api.nutech-integrasi.app/services', {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
    findServiceByName: (state, action) => {
      const nameToFind = action.payload
      if (Array.isArray(state.service)) {
        const foundData = state.service.map((item) => item.service_code === nameToFind)
        if (foundData) {
          state.serviceByName = foundData
          state.isError = null
        } else {
          state.serviceByName = null
          state.isError = 'Data not Found'
        }
      } else {
        console.log('bukan array')
      }

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.banner = action.payload
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.service = action.payload
      })
  }
})

export const { reset, findServiceByName } = assetsSlice.actions
export default assetsSlice.reducer