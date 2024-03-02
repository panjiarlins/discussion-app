import users from '@/test-data/users'
import { setupStore } from './store'
import usersSlice, { getAllUsers } from './usersSlice'
import api from '@/lib/api'

/**
 * usersSlice reducer with getAllUsers thunk
 * - should return correct state when data fetching success
 * - should return correct state when data fetching failed
 */
describe('usersSlice reducer with getAllUsers thunk', () => {
  it('should return correct state when data fetching success', async () => {
    const store = setupStore()

    const thunkFunction = getAllUsers()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().users.allUsers).toEqual(users.data.data.users)
  })

  it('should return correct state when data fetching failed', async () => {
    const store = setupStore()
    jest.spyOn(api, 'get').mockRejectedValueOnce(new Error('error'))

    const thunkFunction = getAllUsers()
    await thunkFunction(store.dispatch, () => store.getState(), undefined)

    expect(store.getState().users.allUsers).toEqual(
      usersSlice.getInitialState().allUsers
    )
  })
})
