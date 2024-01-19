'use client'

import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { useAppDispatch } from '@/store/hooks'
import { type ThreadDetail } from '@/types/thread'
import getErrorMessage from '@/utils/error-handler'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from 'sonner'

export default function DownVoteCommentButton({
  threadId,
  commentId,
  downVotesBy = [],
}: {
  threadId: ThreadDetail['id']
  commentId: ThreadDetail['comments'][number]['id']
  downVotesBy: ThreadDetail['downVotesBy']
}) {
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isVotedByUser = useMemo(
    () => downVotesBy.findIndex((userId) => userId === data?.user.id) !== -1,
    [downVotesBy, data?.user.id]
  )
  const handleVote = useCallback(async () => {
    try {
      dispatch(showLoading(`threads/${threadId}/voteComment/${commentId}`))
      await api.post(
        `/threads/${threadId}/comments/${commentId}/${
          isVotedByUser ? 'neutral-vote' : 'down-vote'
        }`,
        {},
        {
          headers: { Authorization: `Bearer ${data?.user.token}` },
        }
      )
      router.refresh()
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      dispatch(hideLoading(`threads/${threadId}/voteComment/${commentId}`))
    }
  }, [dispatch, threadId, commentId, router, isVotedByUser, data?.user.token])

  return (
    <Button
      onClick={handleVote}
      variant="ghost"
      className="space-x-1 rounded-full"
    >
      {downVotesBy.findIndex((userId) => data?.user.id === userId) === -1 ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>{downVotesBy.length}</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{downVotesBy.length}</span>
        </>
      )}
    </Button>
  )
}
