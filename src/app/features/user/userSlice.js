import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  user: null,
  balance: null,
  trasaction: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// GET User
export const getUserProfile = createAsyncThunk('user/profile', async (token, thunkAPI) => {
  try {
    return await userService.getProfile(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getUserSaldo = createAsyncThunk('user/saldo', async (token, thunkAPI) => {
  try {
    return await userService.getSaldo(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateProfileUser = createAsyncThunk('user/update', async (token, thunkAPI) => {
  try {
    return await userService.updateProfile(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateProfileImageUser = createAsyncThunk('user/update/image', async (data, thunkAPI) => {
  try {
    return await userService.updateProfileImage(data)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const topUpSaldoUser = createAsyncThunk('user/topup', async (data, thunkAPI) => {
  try {
    return await userService.topUpSaldo(data)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const paymentUser = createAsyncThunk('user/payment', async (data, thunkAPI) => {
  try {
    return await userService.payment(data)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getTrasaction = createAsyncThunk('user/trasaction', async (dataParam, thunkAPI) => {
  try {
    return await userService.trasactionHistory(dataParam)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserSlice: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })

      .addCase(getUserSaldo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.balance = action.payload
      })

      .addCase(updateProfileUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload.message
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.user = null
      })

      .addCase(updateProfileImageUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfileImageUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = action.payload.message
      })
      .addCase(updateProfileImageUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.user = null
      })

      .addCase(topUpSaldoUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(topUpSaldoUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.balance = action.payload
        state.message = action.payload.message
      })
      .addCase(topUpSaldoUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.user = null
      })

      .addCase(paymentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(paymentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.balance = action.payload
        state.message = action.payload.message
      })
      .addCase(paymentUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.user = null
      })

      .addCase(getTrasaction.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTrasaction.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.trasaction = action.payload
        state.message = action.payload.message
      })
      .addCase(getTrasaction.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })
  }
})

export const { resetUserSlice } = userSlice.actions
export default userSlice.reducer