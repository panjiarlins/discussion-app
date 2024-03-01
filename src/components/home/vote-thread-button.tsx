'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { voteThread } from '@/store/threadsSlice'
import { type Threads } from '@/types/threads'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function VoteThreadButton({
  threadId,
  votesType,
  votesBy,
}: {
  threadId: Threads[number]['id']
  votesType: 'up-vote' | 'down-vote'
  votesBy: Threads[number]['upVotesBy'] | Threads[number]['downVotesBy']
}) {
  const loading = useAppSelector((state) => state.loadingBar)
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [optimisticUserVote, setOptimisticUserVote] = useState({
    isVotedByUser:
      votesBy.findIndex((userId) => userId === data?.user.id) !== -1,
    pending: false,
  })

  useEffect(() => {
    setOptimisticUserVote({
      isVotedByUser:
        votesBy.findIndex((userId) => userId === data?.user.id) !== -1,
      pending: false,
    })
  }, [votesBy, data?.user.id])

  const handleVote = useCallback(async () => {
    if (!data?.user.token) {
      router.push('/login')
      return
    }
    await dispatch(
      voteThread({
        threadId,
        voteType: optimisticUserVote.isVotedByUser ? 'neutral-vote' : votesType,
        setOptimisticUserVote,
      })
    )
  }, [
    data?.user.token,
    dispatch,
    threadId,
    optimisticUserVote.isVotedByUser,
    votesType,
    router,
  ])

  return (
    <Button
      aria-label={`${votesType} thread`}
      onClick={handleVote}
      variant="ghost"
      className="w-24 space-x-1 rounded-full"
      type="button"
      disabled={
        optimisticUserVote.pending || loading[`threads/voteThread/${threadId}`]
      }
    >
      {votesType === 'up-vote' && (
        <ArrowBigUp
          role="img"
          className={`size-6 stroke-primary ${
            optimisticUserVote.isVotedByUser
              ? 'fill-primary'
              : 'fill-background'
          }`}
        />
      )}
      {votesType === 'down-vote' && (
        <ArrowBigDown
          role="img"
          className={`size-6 stroke-primary ${
            optimisticUserVote.isVotedByUser
              ? 'fill-primary'
              : 'fill-background'
          }`}
        />
      )}
      <span className="truncate">
        {optimisticUserVote.pending
          ? optimisticUserVote.isVotedByUser
            ? votesBy.length + 1
            : votesBy.length - 1
          : votesBy.length}
      </span>
    </Button>
  )
}
