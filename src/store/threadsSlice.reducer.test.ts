import { setupStore } from './store'
import api from '@/lib/api'
import threadsSlice, {
  getAllThreads,
  getThreads,
  voteThread,
} from './threadsSlice'
import users from '@/test-data/users'
import threads from '@/test-data/threads'
import allThreads from '@/test-data/allThreads'
import {
  downVoteData,
  downVoteResponse,
  upVoteData,
  upVoteResponse,
} from '@/test-data/voteThread'

// create mock API
jest.mock('../lib/api', () => ({
  ...jest.requireActual('../lib/api'),
  get: jest.fn(async (url: string) => {
    if (url === '/users') return await Promise.resolve(users)
    if (url === '/threads') return await Promise.resolve(threads)
  }),
  post: jest.fn(
    async (
      url: string,
      data: { title: string; body: string; category: string }
    ) => {
      if (url === `/threads/${upVoteData.threadId}/up-vote`)
        return await Promise.resolve(upVoteResponse)
      if (url === `/threads/${upVoteData.threadId}/down-vote`)
        return await Promise.resolve(downVoteResponse)
    }
  ),
}))

jest.mock('next-auth/react')

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

/**
 * threadsSlice reducer with getAllThreads thunk
 * - should return correct state when data fetching success
 * - should return correct state when data fetching failed
 */
describe('threadsSlice reducer with getAllThreads thunk', () => {
  it('should return correct state when data fetching success', async () => {
    const store = setupStore()

    const thunkFunction = getAllThreads()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.allThreads).toEqual(allThreads)
  })

  it('should return correct state when data fetching failed', async () => {
    const store = setupStore()
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('error'))

    const thunkFunction = getAllThreads()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.allThreads).toEqual(
      threadsSlice.getInitialState().allThreads
    )
  })
})

/**
 * threadsSlice reducer with getThreads thunk
 * - should return correct state when data fetching success
 * - should return correct state when data fetching failed
 */
describe('threadsSlice reducer with getThreads thunk', () => {
  it('should return correct state when data fetching success', async () => {
    const store = setupStore()
    const searchParams = new URLSearchParams()

    const thunkFunction = getThreads({ searchParams })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.threads).toEqual(threads.data.data.threads)
  })

  it('should return correct state when data fetching failed', async () => {
    const store = setupStore()
    const searchParams = new URLSearchParams()
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('error'))

    const thunkFunction = getThreads({ searchParams })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.threads).toEqual(
      threadsSlice.getInitialState().threads
    )
  })
})

/**
 * threadsSlice reducer with voteThread thunk
 * - should return correct state when up-vote
 * - should return correct state when down-vote
 */
describe('threadsSlice reducer with voteThread thunk', () => {
  it('should return correct state when up-vote', async () => {
    const store = setupStore()
    await getThreads({ searchParams: new URLSearchParams() })(
      store.dispatch,
      () => store.getState(),
      undefined
    )

    const thunkFunction = voteThread({
      threadId: upVoteData.threadId,
      voteType: 'up-vote',
    })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.threads[upVoteData.threadIndex]).toEqual(
      upVoteData.threadResult
    )
  })

  it('should return correct state when down-vote', async () => {
    const store = setupStore()
    await getThreads({ searchParams: new URLSearchParams() })(
      store.dispatch,
      () => store.getState(),
      undefined
    )

    const thunkFunction = voteThread({
      threadId: downVoteData.threadId,
      voteType: 'down-vote',
    })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.threads[downVoteData.threadIndex]).toEqual(
      downVoteData.threadResult
    )
  })
})
