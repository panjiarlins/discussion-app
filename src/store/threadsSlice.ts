import api from '@/lib/api'
import { type Threads } from '@/types/thread'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'

interface InitialState {
  loading: boolean
  threads: Threads
  error: string
}

const initialState: InitialState = {
  loading: false,
  threads: [],
  error: '',
}

export const getThreads = createAsyncThunk<Threads>(
  'threads/getThreads',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const toastId = toast.loading('Loading....', {
      duration: Infinity,
      dismissible: true,
    })
    try {
      // await new Promise((resolve) => setTimeout(resolve, 5000))
      const { data } = await api.get('/threads')

      //   toast.success('Success!', { id: toastId, duration: 4000 })
      toast.dismiss(toastId)
      return fulfillWithValue(data.data.threads)
    } catch (error: any) {
      const message = (error?.message as string) ?? 'Error!'
      toast.error(message, { id: toastId, duration: 4000 })
      return rejectWithValue(message)
    }
  }
)

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getThreads.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getThreads.fulfilled, (state, action) => {
      state.loading = false
      state.threads = action.payload
    })
    builder.addCase(getThreads.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export default threadsSlice
