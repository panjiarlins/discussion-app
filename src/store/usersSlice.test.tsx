import { useAppDispatch, useAppSelector } from './hooks'
import { renderWithProviders } from './test-utils'
import { getAllUsers } from './usersSlice'
import { fireEvent, screen } from '@testing-library/react'
import users from '@/test-data/users'

// create mock API
jest.mock('../lib/api', () => ({
  ...jest.requireActual('../lib/api'),
  get: jest.fn(async (url: string) => {
    if (url === '/users') return await Promise.resolve(users)
  }),
}))

/**
 * usersSlice - integration tests with components
 * - should getAllUsers correctly
 */
describe('usersSlice - integration tests with components', () => {
  it('should getAllUsers correctly', async () => {
    const Test = () => {
      const allUsers = useAppSelector((state) => state.users.allUsers)
      const dispatch = useAppDispatch()
      return (
        <>
          <button onClick={async () => await dispatch(getAllUsers())}>
            Fetch
          </button>
          <div>{JSON.stringify(allUsers)}</div>
        </>
      )
    }
    renderWithProviders(<Test />)

    fireEvent.click(screen.getByRole('button', { name: /Fetch/i }))

    expect(
      await screen.findByText(JSON.stringify(users.data.data.users))
    ).toBeInTheDocument()
  })
})
