import api from '@/lib/api'
import { type Users } from '@/types/users'
import getErrorMessage from '@/utils/get-error-message'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from 'sonner'

export const getAllUsers = createAsyncThunk<Users>(
  'threads/getAllUsers',
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      dispatch(showLoading('threads/getAllUsers'))
      const { data } = await api.get('/users')
      return fulfillWithValue(data.data.users)
    } catch (error: any) {
      const message = await getErrorMessage(error)
      toast.error(message)
      return rejectWithValue(message)
    } finally {
      dispatch(hideLoading('threads/getAllUsers'))
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false as boolean,
    allUsers: [] as Users,
    error: '' as string,
  },
  reducers: {},
  extraReducers(builder) {
    // getAllUsers
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false
      state.allUsers = action.payload
    })
  },
})

export default usersSlice
