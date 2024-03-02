import { act, render, screen } from '@testing-library/react'
import SearchInput from './search-input'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'

/**
 * home/@sidebar/SearchButton component
 * - should render correctly
 * - should handle search correctly
 */
describe('home/@sidebar/SearchButton component', () => {
  it('should render correctly', async () => {
    render(<SearchInput />)
    const searchInput = screen.getByRole('searchbox')
    const searchIcon = screen.getByRole('img')

    expect(searchInput).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
  })

  it('should handle search correctly', async () => {
    render(<SearchInput />)
    const routerMock = jest.mocked(useRouter)
    const searchInput = screen.getByRole('searchbox')

    await userEvent.type(searchInput, 'test')
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)) // wait for debounce
    })

    expect(searchInput).toHaveValue('test')
    expect(routerMock).toHaveBeenCalled()
    expect(
      routerMock.mock.results.slice(-1)[0].value.push
    ).toHaveBeenCalledWith('/?q=test')
  })
})
