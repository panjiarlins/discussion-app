import { setupStore } from './store'
import {
  createThread,
  getAllThreads,
  getThreads,
  voteThread,
} from './threadsSlice'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '@/lib/api'
import users from '@/__tests__/test-data/users'
import threads from '@/__tests__/test-data/threads'
import allThreads from '@/__tests__/test-data/allThreads'
import filterThreads from '@/utils/filter-threads'
import newThread from '@/__tests__/test-data/newThread'
import { getSession } from 'next-auth/react'

// Mocking API
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
      if (url === '/threads') {
        const thread: typeof newThread = JSON.parse(JSON.stringify(newThread))
        thread.data.data.thread = { ...thread.data.data.thread, ...data }
        return await Promise.resolve(thread)
      }
    }
  ),
}))

jest.mock('next-auth/react')

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

/**
 * getAllThreads thunk
 * - should create action type correctly
 * - should dispatch action correctly when data fetching success
 * - should dispatch action correctly when data fetching failed
 */
describe('getAllThreads thunk', () => {
  const actionType = 'threads/getAllThreads'

  it('should create action type correctly', () => {
    const { typePrefix, fulfilled, pending, rejected } = getAllThreads
    expect(typePrefix).toBe(actionType)
    expect(fulfilled.type).toBe(`${actionType}/fulfilled`)
    expect(pending.type).toBe(`${actionType}/pending`)
    expect(rejected.type).toBe(`${actionType}/rejected`)
  })

  it('should dispatch action correctly when data fetching success', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    const apiSpy = jest.spyOn(api, 'get')

    const thunkFunction = getAllThreads()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function))
    expect(apiSpy).toHaveBeenCalledTimes(2)
    expect(apiSpy).toHaveBeenCalledWith('/users')
    expect(apiSpy).toHaveBeenCalledWith('/threads')
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.type).toBe(getAllThreads.fulfilled.type)
    expect(result.payload).toEqual(allThreads)
  })

  it('should dispatch action correctly when data fetching failed', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('error'))

    const thunkFunction = getAllThreads()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function))
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.type).toBe(getAllThreads.rejected.type)
  })
})

/**
 * getThreads thunk
 * - should create action type correctly
 * - should dispatch action correctly when data fetching success
 * - should dispatch action correctly when data fetching failed
 */
describe('getThreads thunk', () => {
  const actionType = 'threads/getThreads'

  it('should create action type correctly', () => {
    const { typePrefix, fulfilled, pending, rejected } = getThreads
    expect(typePrefix).toBe(actionType)
    expect(fulfilled.type).toBe(`${actionType}/fulfilled`)
    expect(pending.type).toBe(`${actionType}/pending`)
    expect(rejected.type).toBe(`${actionType}/rejected`)
  })

  it('should dispatch action correctly when data fetching success', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    const apiSpy = jest.spyOn(api, 'get')
    const searchParams = new URLSearchParams()

    const thunkFunction = getThreads({ searchParams })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function))
    expect(apiSpy).toHaveBeenCalledTimes(2)
    expect(apiSpy).toHaveBeenCalledWith('/users')
    expect(apiSpy).toHaveBeenCalledWith('/threads')
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.type).toBe(getThreads.fulfilled.type)
    expect(result.payload).toEqual(filterThreads(allThreads, searchParams))
  })

  it('should dispatch action correctly when data fetching failed', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('error'))
    const searchParams = new URLSearchParams()

    const thunkFunction = getThreads({ searchParams })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Function))
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.payload).toEqual(
      filterThreads(store.getState().threads.allThreads, searchParams)
    )
  })
})

/**
 * voteThread thunk
 * - should create action type correctly
 */
describe('voteThread thunk', () => {
  const actionType = 'threads/voteThread'

  it('should create action type correctly', () => {
    const { typePrefix, fulfilled, pending, rejected } = voteThread
    expect(typePrefix).toBe(actionType)
    expect(fulfilled.type).toBe(`${actionType}/fulfilled`)
    expect(pending.type).toBe(`${actionType}/pending`)
    expect(rejected.type).toBe(`${actionType}/rejected`)
  })
})

/**
 * createThread thunk
 * - should create action type correctly
 * - should dispatch action correctly when create thread success
 * - should dispatch action correctly when create thread failed
 */
describe('createThread thunk', () => {
  const actionType = 'threads/createThread'

  it('should create action type correctly', () => {
    const { typePrefix, fulfilled, pending, rejected } = createThread
    expect(typePrefix).toBe(actionType)
    expect(fulfilled.type).toBe(`${actionType}/fulfilled`)
    expect(pending.type).toBe(`${actionType}/pending`)
    expect(rejected.type).toBe(`${actionType}/rejected`)
  })

  it('should dispatch action correctly when create thread success', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    const apiSpy = jest.spyOn(api, 'post')
    const getSessionMock = jest.mocked(getSession)
    const searchParams = new URLSearchParams()

    const thunkFunction = createThread({
      searchParams,
      title: newThread.data.data.thread.title,
      body: newThread.data.data.thread.body,
      category: newThread.data.data.thread.category,
    })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(getSessionMock).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.type).toBe(createThread.fulfilled.type)
    expect(result.payload).toEqual(newThread.data.data.thread)
  })

  it('should dispatch action correctly when create thread failed', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    jest.spyOn(api, 'post').mockRejectedValueOnce(new Error('error'))
    const getSessionMock = jest.mocked(getSession)
    const searchParams = new URLSearchParams()

    const thunkFunction = createThread({
      searchParams,
      title: newThread.data.data.thread.title,
      body: newThread.data.data.thread.body,
      category: newThread.data.data.thread.category,
    })
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(getSessionMock).toHaveBeenCalledTimes(1)
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.type).toBe(createThread.rejected.type)
  })
})
