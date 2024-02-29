import { setupStore } from './store'
import api from '@/lib/api'
import threadsSlice, { getAllThreads } from './threadsSlice'
import users from '@/test-data/users'
import threads from '@/test-data/threads'
import allThreads from '@/test-data/allThreads'

// create mock API
jest.mock('../lib/api', () => ({
  ...jest.requireActual('../lib/api'),
  get: jest.fn(async (url: string) => {
    if (url === '/users') return await Promise.resolve(users)
    if (url === '/threads') return await Promise.resolve(threads)
  }),
}))

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
