import { screen, within } from '@testing-library/react'
import VoteThreadButton from './vote-thread-button'
import { renderWithProviders } from '@/store/test-utils'
import { useEffect, useMemo } from 'react'
import { getThreads } from '@/store/threadsSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { downVoteData, upVoteData } from '@/test-data/voteThread'
import userEvent from '@testing-library/user-event'

/**
 * home/VoteThreadButton component
 * - should handle up-vote thread correctly
 * - should handle down-vote thread correctly
 */
describe('home/VoteThreadButton component', () => {
  it('should handle up-vote thread correctly', async () => {
    function Test() {
      const dispatch = useAppDispatch()
      const threads = useAppSelector((state) => state.threads.threads)
      useEffect(() => {
        void dispatch(getThreads({ searchParams: new URLSearchParams() }))
      }, [dispatch])
      const threadData = useMemo(
        () => threads.find((thread) => thread.id === upVoteData.threadId),
        [threads]
      )
      return (
        <>
          {threadData && (
            <VoteThreadButton
              threadId={threadData.id}
              votesBy={threadData.upVotesBy}
              votesType="up-vote"
            />
          )}
        </>
      )
    }
    renderWithProviders(<Test />)

    const voteButton = await screen.findByRole('button')
    const voteIcon = within(voteButton).getByRole('img')

    expect(voteButton).toBeInTheDocument()
    expect(voteIcon).toBeInTheDocument()
    expect(voteButton).toHaveTextContent(
      `${upVoteData.threadBeforeVote.upVotesBy.length}`
    )

    await userEvent.click(voteButton)

    expect(voteButton).toHaveTextContent(
      `${upVoteData.threadAfterVote.upVotesBy.length}`
    )
  })

  it('should handle down-vote thread correctly', async () => {
    function Test() {
      const dispatch = useAppDispatch()
      const threads = useAppSelector((state) => state.threads.threads)
      useEffect(() => {
        void dispatch(getThreads({ searchParams: new URLSearchParams() }))
      }, [dispatch])
      const threadData = useMemo(
        () => threads.find((thread) => thread.id === downVoteData.threadId),
        [threads]
      )
      return (
        <>
          {threadData && (
            <VoteThreadButton
              threadId={threadData.id}
              votesBy={threadData.upVotesBy}
              votesType="down-vote"
            />
          )}
        </>
      )
    }
    renderWithProviders(<Test />)

    const voteButton = await screen.findByRole('button')
    const voteIcon = within(voteButton).getByRole('img')

    expect(voteButton).toBeInTheDocument()
    expect(voteIcon).toBeInTheDocument()
    expect(voteButton).toHaveTextContent(
      `${downVoteData.threadBeforeVote.upVotesBy.length}`
    )

    await userEvent.click(voteButton)

    expect(voteButton).toHaveTextContent(
      `${downVoteData.threadAfterVote.upVotesBy.length}`
    )
  })
})
