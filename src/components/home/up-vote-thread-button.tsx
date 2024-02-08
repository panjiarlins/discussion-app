'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { voteThread } from '@/store/threadsSlice'
import { type Threads } from '@/types/threads'
import { ArrowBigUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function UpVoteThreadButton({
  threadId,
  upVotesBy = [],
}: {
  threadId: Threads[number]['id']
  upVotesBy: Threads[number]['upVotesBy']
}) {
  const loading = useAppSelector((state) => state.loadingBar)
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [optimisticUserVote, setOptimisticUserVote] = useState({
    isVotedByUser:
      upVotesBy.findIndex((userId) => userId === data?.user.id) !== -1,
    pending: false,
  })

  useEffect(() => {
    setOptimisticUserVote({
      isVotedByUser:
        upVotesBy.findIndex((userId) => userId === data?.user.id) !== -1,
      pending: false,
    })
  }, [upVotesBy, data?.user.id])

  const handleVote = useCallback(async () => {
    if (!data?.user.token) {
      router.push('/login')
      return
    }
    await dispatch(
      voteThread({
        threadId,
        voteType: optimisticUserVote.isVotedByUser ? 'neutral-vote' : 'up-vote',
        setOptimisticUserVote,
      })
    )
  }, [
    data?.user.token,
    dispatch,
    threadId,
    optimisticUserVote.isVotedByUser,
    router,
  ])

  return (
    <Button
      onClick={handleVote}
      variant="ghost"
      className="w-24 space-x-1 rounded-full"
      type="button"
      disabled={
        optimisticUserVote.pending || loading[`threads/voteThread/${threadId}`]
      }
    >
      <ArrowBigUp
        className={`size-6 stroke-primary ${
          optimisticUserVote.isVotedByUser ? 'fill-primary' : 'fill-background'
        }`}
      />
      <span>
        {optimisticUserVote.pending
          ? optimisticUserVote.isVotedByUser
            ? upVotesBy.length + 1
            : upVotesBy.length - 1
          : upVotesBy.length}
      </span>
    </Button>
  )
}
