import { render, screen } from '@testing-library/react'
import LogoutButton from './logout-button'
import userEvent from '@testing-library/user-event'
import signOut from '@/lib/sign-out'

jest.mock('../../../lib/sign-out')

/**
 * home/@sidebar/LogoutButton component
 * - should render correctly
 * - should handle logout correctly
 */
describe('home/@sidebar/LogoutButton component', () => {
  it('should render correctly', async () => {
    render(<LogoutButton />)
    const logoutButton = screen.getByRole('button')

    await userEvent.click(logoutButton)

    expect(logoutButton).toBeInTheDocument()
    expect(logoutButton).toHaveTextContent('Log out')
  })

  it('should handle logout correctly', async () => {
    const signOutMock = jest.mocked(signOut)
    render(<LogoutButton />)
    const logoutButton = screen.getByRole('button')

    await userEvent.click(logoutButton)

    expect(signOutMock).toHaveBeenCalledTimes(1)
  })
})
