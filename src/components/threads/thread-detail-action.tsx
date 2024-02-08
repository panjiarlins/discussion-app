import { type Threads } from '@/types/threads'
import CommentButton from '../home/comment-button'
import { getThreadActionData } from '@/utils/thread'
import { notFound } from 'next/navigation'
import VoteThreadButton from './vote-thread-button'

export default async function ThreadDetailAction({
  threadId,
}: {
  threadId: Threads[number]['id']
}) {
  const { data: threadActionData } = await getThreadActionData({ threadId })

  if (!threadActionData) return notFound()

  return (
    <>
      <VoteThreadButton
        threadId={threadActionData.id}
        votesType="up-vote"
        votesBy={threadActionData.upVotesBy}
      />
      <VoteThreadButton
        threadId={threadActionData.id}
        votesType="down-vote"
        votesBy={threadActionData.downVotesBy}
      />
      <CommentButton
        threadId={threadActionData.id}
        totalComments={threadActionData.comments.length}
      />
    </>
  )
}
