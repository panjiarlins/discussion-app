import api from '@/lib/api'
import { type ThreadVote, type Threads } from '@/types/threads'
import getErrorMessage from '@/utils/get-error-message'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSession } from 'next-auth/react'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from 'sonner'
import { type RootState } from './store'
import filterThreads from '@/utils/filter-threads'
import { type useSearchParams } from 'next/navigation'
import { getAllUsers } from './userSlice'

export const getAllThreads = createAsyncThunk<Threads>(
  'threads/getAllThreads',
  async (_, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      dispatch(showLoading('threads/getAllThreads'))

      const { type } = await dispatch(getAllUsers())
      if (!type.endsWith('fulfilled'))
        throw new Error('Failed to get all users!')

      const allUsers = (getState() as RootState).users.allUsers

      const {
        data: {
          data: { threads },
        },
      }: { data: { data: { threads: Threads } } } = await api.get('/threads')

      threads.forEach((thread) => {
        thread.owner = allUsers.find((user) => user.id === thread.ownerId)
      })

      return fulfillWithValue(threads)
    } catch (error: any) {
      const message = await getErrorMessage(error)
      toast.error(message)
      return rejectWithValue(message)
    } finally {
      dispatch(hideLoading('threads/getAllThreads'))
    }
  }
)

export const getThreads = createAsyncThunk<
  Threads,
  { searchParams: ReturnType<typeof useSearchParams> }
>(
  'threads/getThreads',
  async (
    { searchParams },
    { getState, dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      dispatch(showLoading('threads/getThreads'))
      await dispatch(getAllThreads())
      const threads = filterThreads(
        (getState() as RootState).threads.allThreads,
        searchParams
      )
      return fulfillWithValue(threads)
    } catch (error: any) {
      const message = await getErrorMessage(error)
      toast.error(message)
      return rejectWithValue(message)
    } finally {
      dispatch(hideLoading('threads/getThreads'))
    }
  }
)

export const voteThread = createAsyncThunk<
  ThreadVote,
  {
    threadId: string
    voteType: 'up-vote' | 'down-vote' | 'neutral-vote'
    setOptimisticUserVote: React.Dispatch<
      React.SetStateAction<{
        isVotedByUser: boolean
        pending: boolean
      }>
    >
  }
>(
  'threads/voteThread',
  async (
    { threadId, voteType, setOptimisticUserVote },
    { dispatch, fulfillWithValue, rejectWithValue }
  ) => {
    try {
      setOptimisticUserVote((prev) => ({
        isVotedByUser: !prev.isVotedByUser,
        pending: true,
      }))
      dispatch(showLoading(`threads/voteThread/${threadId}`))
      const session = await getSession()
      const { data } = await api.post(
        `/threads/${threadId}/${voteType}`,
        {},
        { headers: { Authorization: `Bearer ${session?.user.token}` } }
      )
      return fulfillWithValue(data.data.vote)
    } catch (error: any) {
      setOptimisticUserVote((prev) => ({
        isVotedByUser: !prev.isVotedByUser,
        pending: false,
      }))
      const message = await getErrorMessage(error)
      toast.error(message)
      return rejectWithValue(message)
    } finally {
      dispatch(hideLoading(`threads/voteThread/${threadId}`))
      setOptimisticUserVote((prev) => ({
        ...prev,
        pending: false,
      }))
    }
  }
)

export const createThread = createAsyncThunk<
  Threads[number],
  {
    title: string
    body: string
    category?: string
    searchParams: ReturnType<typeof useSearchParams>
  }
>(
  'threads/createThread',
  async (
    { title, body, category, searchParams },
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
      const message = await getErrorMessage(error)
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
    allThreads: [] as Threads,
    threads: [] as Threads,
    error: '' as string,
  },
  reducers: {},
  extraReducers(builder) {
    // getAllThreads
    builder.addCase(getAllThreads.pending, (state) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getAllThreads.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(getAllThreads.fulfilled, (state, action) => {
      state.loading = false
      state.allThreads = action.payload
    })

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
      state.allThreads.unshift(action.payload)
      state.threads = filterThreads(
        state.allThreads,
        action.meta.arg.searchParams
      )
    })
  },
})

export default threadsSlice
