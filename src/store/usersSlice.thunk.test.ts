import users from '@/test-data/users'
import { getAllUsers } from './usersSlice'
import { setupStore } from './store'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import api from '@/lib/api'

// Mocking API
jest.mock('../lib/api', () => ({
  ...jest.requireActual('../lib/api'),
  get: jest.fn(async (url: string) => {
    if (url === '/users') return await Promise.resolve(users)
  }),
}))

afterEach(() => {
  jest.clearAllMocks()
  jest.restoreAllMocks()
})

/**
 * getAllUsers thunk
 * - should create action type correctly
 * - should dispatch action correctly when data fetching success
 * - should dispatch action correctly when data fetching failed
 */
describe('getAllUsers thunk', () => {
  const actionType = 'threads/getAllUsers'

  it('should create action type correctly', () => {
    const { typePrefix, fulfilled, pending, rejected } = getAllUsers
    expect(typePrefix).toBe(actionType)
    expect(fulfilled.type).toBe(`${actionType}/fulfilled`)
    expect(pending.type).toBe(`${actionType}/pending`)
    expect(rejected.type).toBe(`${actionType}/rejected`)
  })

  it('should dispatch action correctly when data fetching success', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    const apiSpy = jest.spyOn(api, 'get')

    const thunkFunction = getAllUsers()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(apiSpy).toHaveBeenCalledTimes(1)
    expect(apiSpy).toHaveBeenCalledWith('/users')
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.type).toBe(getAllUsers.fulfilled.type)
    expect(result.payload).toEqual(users.data.data.users)
  })

  it('should dispatch action correctly when data fetching failed', async () => {
    const store = setupStore()
    const dispatchSpy = jest.spyOn(store, 'dispatch')
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('error'))

    const thunkFunction = getAllUsers()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(dispatchSpy).toHaveBeenCalledWith(showLoading(actionType))
    expect(dispatchSpy).toHaveBeenCalledWith(hideLoading(actionType))
    const result = dispatchSpy.mock.results.slice(-1)[0].value
    expect(result.type).toBe(getAllUsers.rejected.type)
  })
})
