'use client'

import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store/hooks'
import { voteThread } from '@/store/threadsSlice'
import { type Threads } from '@/types/threads'
import { ArrowBigDown } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export default function DownVoteThreadButton({
  threadId,
  downVotesBy = [],
}: {
  threadId: Threads[number]['id']
  downVotesBy: Threads[number]['downVotesBy']
}) {
  const { data } = useSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isVotedByUser = useMemo(
    () => downVotesBy.findIndex((userId) => userId === data?.user.id) !== -1,
    [downVotesBy, data?.user.id]
  )
  const handleVote = useCallback(async () => {
    if (!data?.user.token) {
      router.push('/login')
      return
    }
    await dispatch(
      voteThread({
        threadId,
        voteType: isVotedByUser ? 'neutral-vote' : 'down-vote',
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
      <ArrowBigDown
        className={`size-6 stroke-primary ${
          isVotedByUser ? 'fill-primary' : 'fill-background'
        }`}
      />
      <span>{downVotesBy.length}</span>
    </Button>
  )
}
