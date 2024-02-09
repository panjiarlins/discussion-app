'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { type ThreadDetail } from '@/types/threads'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { voteThreadComment } from '@/utils/thread'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from 'sonner'

export default function VoteCommentButton({
  threadId,
  commentId,
  votesType,
  votesBy,
}: {
  threadId: ThreadDetail['id']
  commentId: ThreadDetail['comments'][number]['id']
  votesType: 'up-vote' | 'down-vote'
  votesBy:
    | ThreadDetail['comments'][number]['upVotesBy']
    | ThreadDetail['comments'][number]['downVotesBy']
}) {
  const loading = useAppSelector((state) => state.loadingBar)
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const isVotedByUser = useMemo(
    () => votesBy.findIndex((userId) => userId === data?.user.id) !== -1,
    [data?.user.id, votesBy]
  )

  const { execute, status } = useAction(voteThreadComment, {
    onExecute: () => {
      dispatch(showLoading(`threads/${threadId}/voteComment/${commentId}`))
    },
    onError: (error) => {
      toast.error(error.fetchError ?? error.serverError ?? 'Error!')
      dispatch(hideLoading(`threads/${threadId}/voteComment/${commentId}`))
    },
    onSuccess: () => {
      dispatch(hideLoading(`threads/${threadId}/voteComment/${commentId}`))
    },
  })

  const handleVote = useCallback(() => {
    if (!data?.user.token) {
      router.push('/login')
      return
    }
    execute({
      threadId,
      commentId,
      voteType: isVotedByUser ? 'neutral-vote' : votesType,
    })
  }, [
    data?.user.token,
    execute,
    threadId,
    commentId,
    isVotedByUser,
    votesType,
    router,
  ])

  return (
    <Button
      onClick={handleVote}
      variant="ghost"
      className="w-24 space-x-1 rounded-full"
      type="button"
      disabled={
        loading[`threads/${threadId}/voteComment/${commentId}`] ||
        status === 'executing'
      }
    >
      {votesType === 'up-vote' && (
        <ArrowBigUp
          className={`size-6 stroke-primary ${
            status === 'executing'
              ? isVotedByUser
                ? 'fill-background'
                : 'fill-primary'
              : isVotedByUser
                ? 'fill-primary'
                : 'fill-background'
          }`}
        />
      )}
      {votesType === 'down-vote' && (
        <ArrowBigDown
          className={`size-6 stroke-primary ${
            status === 'executing'
              ? isVotedByUser
                ? 'fill-background'
                : 'fill-primary'
              : isVotedByUser
                ? 'fill-primary'
                : 'fill-background'
          }`}
        />
      )}
      <span className="truncate">
        {status === 'executing'
          ? isVotedByUser
            ? votesBy.length - 1
            : votesBy.length + 1
          : votesBy.length}
      </span>
    </Button>
  )
}
