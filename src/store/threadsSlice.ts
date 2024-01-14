import api from '@/lib/api'
import { type ThreadVote, type Threads } from '@/types/thread'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSession } from 'next-auth/react'
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

export const voteThread = createAsyncThunk<
  ThreadVote,
  { threadId: string; voteType: 'up-vote' | 'down-vote' | 'neutral-vote' }
>(
  'threads/voteThread',
  async ({ threadId, voteType }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const session = await getSession()
      const { data } = await api.post(
        `/threads/${threadId}/${voteType}`,
        {},
        { headers: { Authorization: `Bearer ${session?.user.token}` } }
      )
      return fulfillWithValue(data.data.vote)
    } catch (error: any) {
      const message = (error?.message as string) ?? 'Error!'
      return rejectWithValue(message)
    }
  }
)

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // getThreads
    builder.addCase(getThreads.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getThreads.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(getThreads.fulfilled, (state, action) => {
      state.loading = false
      state.threads = action.payload
    })

    // voteThread
    builder.addCase(voteThread.pending, (state) => {
      state.loading = true
    })
    builder.addCase(voteThread.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(voteThread.fulfilled, (state, action) => {
      state.loading = false

      const threadIdx = state.threads.findIndex(
        (thread) => thread.id === action.payload.threadId
      )

      if (threadIdx !== -1) {
        const upVoteIdx = state.threads[threadIdx].upVotesBy.indexOf(
          action.payload.userId
        )
        const downVoteIdx = state.threads[threadIdx].downVotesBy.indexOf(
          action.payload.userId
        )

        if (action.payload.voteType === 1) {
          if (upVoteIdx === -1)
            state.threads[threadIdx].upVotesBy.push(action.payload.userId)
          if (downVoteIdx !== -1)
            state.threads[threadIdx].downVotesBy.splice(downVoteIdx, 1)
        } else if (action.payload.voteType === -1) {
          if (upVoteIdx !== -1)
            state.threads[threadIdx].upVotesBy.splice(upVoteIdx, 1)
          if (downVoteIdx === -1)
            state.threads[threadIdx].downVotesBy.push(action.payload.userId)
        } else {
          if (upVoteIdx !== -1)
            state.threads[threadIdx].upVotesBy.splice(upVoteIdx, 1)
          if (downVoteIdx !== -1)
            state.threads[threadIdx].downVotesBy.splice(downVoteIdx, 1)
        }
      }
    })
  },
})

export default threadsSlice
