import { useAppDispatch, useAppSelector } from './hooks'
import { renderWithProviders } from './test-utils'
import { createThread, getAllThreads, getThreads } from './threadsSlice'
import { fireEvent, screen } from '@testing-library/react'
import users from '@/test-data/users'
import threads from '@/test-data/threads'
import newThread from '@/test-data/newThread'
import allThreads from '@/test-data/allThreads'

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
      if (url === '/threads') {
        const thread: typeof newThread = JSON.parse(JSON.stringify(newThread))
        thread.data.data.thread = { ...thread.data.data.thread, ...data }
        return await Promise.resolve(thread)
      }
    }
  ),
}))

jest.mock('next-auth/react')

/**
 * threadsSlice - integration tests with components
 * - should getAllThreads correctly
 * - should getThreads correctly
 * - should createThread correctly
 */
describe('threadsSlice - integration tests with components', () => {
  it('should getAllThreads correctly', async () => {
    const Test = () => {
      const allThreads = useAppSelector((state) => state.threads.allThreads)
      const dispatch = useAppDispatch()
      return (
        <>
          <button onClick={async () => await dispatch(getAllThreads())}>
            Fetch
          </button>
          <div>{JSON.stringify(allThreads)}</div>
        </>
      )
    }
    renderWithProviders(<Test />)

    fireEvent.click(screen.getByRole('button', { name: /Fetch/i }))

    expect(
      await screen.findByText(JSON.stringify(allThreads))
    ).toBeInTheDocument()
  })

  it('should getThreads correctly', async () => {
    const Test = () => {
      const threads = useAppSelector((state) => state.threads.threads)
      const dispatch = useAppDispatch()
      const searchParams = new URLSearchParams()
      return (
        <>
          <button
            onClick={async () => await dispatch(getThreads({ searchParams }))}
          >
            Fetch
          </button>
          <div>{JSON.stringify(threads)}</div>
        </>
      )
    }
    renderWithProviders(<Test />)

    fireEvent.click(screen.getByRole('button', { name: /Fetch/i }))

    expect(
      await screen.findByText(JSON.stringify(threads.data.data.threads))
    ).toBeInTheDocument()
  })

  it('should createThread correctly', async () => {
    const Test = () => {
      const allThreads = useAppSelector((state) => state.threads.allThreads)
      const dispatch = useAppDispatch()
      const searchParams = new URLSearchParams()
      return (
        <>
          <button
            onClick={async () =>
              await dispatch(
                createThread({
                  searchParams,
                  title: newThread.data.data.thread.title,
                  body: newThread.data.data.thread.body,
                  category: newThread.data.data.thread.category,
                })
              )
            }
          >
            Fetch
          </button>
          <div>{JSON.stringify(allThreads[0])}</div>
        </>
      )
    }
    renderWithProviders(<Test />)

    fireEvent.click(screen.getByRole('button', { name: /Fetch/i }))

    expect(
      await screen.findByText(JSON.stringify(newThread.data.data.thread))
    ).toBeInTheDocument()
  })
})
