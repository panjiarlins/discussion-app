'use client'

import { Button } from '@/components/ui/button'
import api from '@/lib/api'
import { useAppDispatch } from '@/store/hooks'
import { type ThreadDetail } from '@/types/threads'
import getErrorMessage from '@/utils/error-handler'
import { ArrowDownCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
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
  const [userVote, setUserVote] = useState({
    isVotedByUser:
      downVotesBy.findIndex((userId) => userId === data?.user.id) !== -1,
    count: downVotesBy.length,
    pending: false,
  })

  useEffect(() => {
    setUserVote({
      isVotedByUser:
        downVotesBy.findIndex((userId) => userId === data?.user.id) !== -1,
      count: downVotesBy.length,
      pending: false,
    })
  }, [downVotesBy, data?.user.id])

  const handleVote = useCallback(async () => {
    try {
      if (!data?.user.token) {
        router.push('/login')
        return
      }
      setUserVote((prev) => ({
        isVotedByUser: !prev.isVotedByUser,
        count: prev.isVotedByUser ? prev.count - 1 : prev.count + 1,
        pending: true,
      }))
      dispatch(showLoading(`threads/${threadId}/voteComment/${commentId}`))
      await api.post(
        `/threads/${threadId}/comments/${commentId}/${
          userVote.isVotedByUser ? 'neutral-vote' : 'down-vote'
        }`,
        {},
        { headers: { Authorization: `Bearer ${data?.user.token}` } }
      )
      router.refresh()
    } catch (error) {
      setUserVote((prev) => ({
        isVotedByUser: !prev.isVotedByUser,
        count: prev.isVotedByUser ? prev.count - 1 : prev.count + 1,
        pending: false,
      }))
      toast.error(getErrorMessage(error))
    } finally {
      dispatch(hideLoading(`threads/${threadId}/voteComment/${commentId}`))
      setUserVote((prev) => ({
        ...prev,
        pending: false,
      }))
    }
  }, [
    data?.user.token,
    dispatch,
    threadId,
    commentId,
    userVote.isVotedByUser,
    router,
  ])

  return (
    <Button
      onClick={handleVote}
      variant="ghost"
      className="space-x-1 rounded-full"
      disabled={userVote.pending}
    >
      {userVote.isVotedByUser ? (
        <ArrowDownCircle className="size-6 stroke-background fill-primary" />
      ) : (
        <ArrowDownCircle className="size-6 stroke-primary fill-background" />
      )}
      <span>{userVote.count}</span>
    </Button>
  )
}
