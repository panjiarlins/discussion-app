import { renderWithProviders } from '@/store/test-utils'
import CategoryButtonList from './category-button-list'
import { screen } from '@testing-library/react'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'
import { getThreads } from '@/store/threadsSlice'
import allThreads from '@/test-data/allThreads'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'

/**
 * home/@sidebar/CategoryButtonList component
 * - should render correctly
 * - should handle category button correctly
 */
describe('home/@sidebar/CategoryButtonList component', () => {
  it('should render correctly', async () => {
    function Test() {
      const dispatch = useAppDispatch()
      useEffect(() => {
        void dispatch(getThreads({ searchParams: new URLSearchParams() }))
      }, [dispatch])

      return <CategoryButtonList />
    }
    renderWithProviders(<Test />)

    const allCategoryButton = screen.getByRole('button', { name: /All/i })
    expect(allCategoryButton).toBeInTheDocument()
    expect(allCategoryButton).toHaveTextContent(/All/i)

    await Promise.all(
      allThreads.map(async (thread) => {
        const categoryButton = await screen.findByRole('button', {
          name: new RegExp(thread.category, 'i'),
        })
        expect(categoryButton).toBeInTheDocument()
        expect(categoryButton).toHaveTextContent(
          new RegExp(thread.category, 'i')
        )
      })
    )
  })

  it('should handle category button correctly', async () => {
    function Test() {
      const dispatch = useAppDispatch()
      useEffect(() => {
        void dispatch(getThreads({ searchParams: new URLSearchParams() }))
      }, [dispatch])

      return <CategoryButtonList />
    }
    renderWithProviders(<Test />)
    const routerMock = jest.mocked(useRouter)

    const allCategoryButton = screen.getByRole('button', { name: /All/i })
    await userEvent.click(allCategoryButton)
    expect(
      routerMock.mock.results.slice(-1)[0].value.push
    ).toHaveBeenCalledWith('/?')

    await Promise.all(
      allThreads.map(async (thread) => {
        const categoryButton = await screen.findByRole('button', {
          name: new RegExp(thread.category, 'i'),
        })
        await userEvent.click(categoryButton)
        expect(
          routerMock.mock.results.slice(-1)[0].value.push
        ).toHaveBeenCalledWith(`/?category=${thread.category}`)
      })
    )
  })
})
