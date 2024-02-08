'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/hooks'
import { voteThread } from '@/store/threadsSlice'
import { type Threads } from '@/types/threads'
import { ArrowBigUp } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export default function UpVoteThreadButton({
  threadId,
  upVotesBy = [],
}: {
  threadId: Threads[number]['id']
  upVotesBy: Threads[number]['upVotesBy']
}) {
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isVotedByUser = useMemo(
    () => upVotesBy.findIndex((userId) => userId === data?.user.id) !== -1,
    [upVotesBy, data?.user.id]
  )
  const handleVote = useCallback(async () => {
    if (!data?.user.token) {
      router.push('/login')
      return
    }
    await dispatch(
      voteThread({
        threadId,
        voteType: isVotedByUser ? 'neutral-vote' : 'up-vote',
      })
    )
    router.refresh()
  }, [dispatch, threadId, isVotedByUser, router, data?.user.token])

  return (
    <Button
      onClick={handleVote}
      variant="ghost"
      className="space-x-1 rounded-full"
      type="button"
    >
      <ArrowBigUp
        className={`size-6 stroke-primary ${
          isVotedByUser ? 'fill-primary' : 'fill-background'
        }`}
      />
      <span>{upVotesBy.length}</span>
    </Button>
  )
}
