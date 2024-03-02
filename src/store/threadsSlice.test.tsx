import { useAppDispatch, useAppSelector } from './hooks'
import { renderWithProviders } from './test-utils'
import { createThread, getAllThreads, getThreads } from './threadsSlice'
import { fireEvent, screen } from '@testing-library/react'
import threads from '@/test-data/threads'
import newThread from '@/test-data/newThread'
import allThreads from '@/test-data/allThreads'

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
