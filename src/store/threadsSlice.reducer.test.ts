import { setupStore } from './store'
import api from '@/lib/api'
import threadsSlice, {
  createThread,
  getAllThreads,
  getThreads,
  voteThread,
} from './threadsSlice'
import threads from '@/test-data/threads'
import newThread from '@/test-data/newThread'
import allThreads from '@/test-data/allThreads'
import { downVoteData, upVoteData } from '@/test-data/voteThread'

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

/**
 * threadsSlice reducer with createThread thunk
 * - should return correct state when createThread success
 * - should return correct state when createThread failed
 */
describe('threadsSlice reducer with createThread thunk', () => {
  it('should return correct state when createThread success', async () => {
    const store = setupStore()

    const thunkFunction = createThread({
      searchParams: new URLSearchParams(),
      title: newThread.data.data.thread.title,
      body: newThread.data.data.thread.body,
      category: newThread.data.data.thread.category,
    })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.allThreads[0]).toEqual(
      newThread.data.data.thread
    )
  })

  it('should return correct state when createThread failed', async () => {
    const store = setupStore()
    jest.spyOn(api, 'post').mockRejectedValueOnce(new Error('error'))

    const thunkFunction = createThread({
      searchParams: new URLSearchParams(),
      title: newThread.data.data.thread.title,
      body: newThread.data.data.thread.body,
      category: newThread.data.data.thread.category,
    })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().threads.allThreads).toEqual(
      threadsSlice.getInitialState().allThreads
    )
  })
})
