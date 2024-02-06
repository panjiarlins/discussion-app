import api from '@/lib/api'
import { type ThreadVote, type Threads } from '@/types/threads'
import getErrorMessage from '@/utils/error-handler'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSession } from 'next-auth/react'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from 'sonner'

export const getThreads = createAsyncThunk<Threads>(
  'threads/getThreads',
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      dispatch(showLoading('threads/getThreads'))
      const { data } = await api.get('/threads')
      return fulfillWithValue(data.data.threads)
    } catch (error: any) {
      const message = getErrorMessage(error)
      toast.error(message)
      return rejectWithValue(message)
    } finally {
      dispatch(hideLoading('threads/getThreads'))
    }
  }
)

export const voteThread = createAsyncThunk<
  ThreadVote,
  { threadId: string; voteType: 'up-vote' | 'down-vote' | 'neutral-vote' }
>(
  'threads/voteThread',
  async (
    { threadId, voteType },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      dispatch(showLoading(`threads/voteThread/${threadId}`))
      const session = await getSession()
      const { data } = await api.post(
        `/threads/${threadId}/${voteType}`,
        {},
        { headers: { Authorization: `Bearer ${session?.user.token}` } }
      )
      return fulfillWithValue(data.data.vote)
    } catch (error: any) {
      const message = getErrorMessage(error)
      toast.error(message)
      return rejectWithValue(message)
    } finally {
      dispatch(hideLoading(`threads/voteThread/${threadId}`))
    }
  }
)

export const createThread = createAsyncThunk<
  Threads[number],
  { title: string; body: string; category?: string }
>(
  'threads/createThread',
  async (
    { title, body, category },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      dispatch(showLoading('threads/createThread'))
      const session = await getSession()
      const { data } = await api.post(
        '/threads',
        { title, body, category },
        { headers: { Authorization: `Bearer ${session?.user.token}` } }
      )
      return fulfillWithValue(data.data.thread)
    } catch (error: any) {
      const message = getErrorMessage(error)
      toast.error(message)
      return rejectWithValue(message)
    } finally {
      dispatch(hideLoading('threads/createThread'))
    }
  }
)

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    loading: false as boolean,
    threads: [] as Threads,
    error: '' as string,
  },
  reducers: {},
  extraReducers(builder) {
    // getThreads
    builder.addCase(getThreads.pending, (state) => {
      state.loading = true
      state.error = ''
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
      state.error = ''
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

    // createThread
    builder.addCase(createThread.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(createThread.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(createThread.fulfilled, (state, action) => {
      state.loading = false
      state.threads.unshift(action.payload)
    })
  },
})

export default threadsSlice
