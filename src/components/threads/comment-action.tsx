import { type ThreadDetail } from '@/types/threads'
import { getThreadCommentActionData } from '@/utils/thread'
import { notFound } from 'next/navigation'
import VoteCommentButton from './vote-comment-button'

export default async function CommentAction({
  threadId,
  commentId,
}: {
  threadId: ThreadDetail['id']
  commentId: ThreadDetail['comments'][number]['id']
}) {
  const { data: commentActionData } = await getThreadCommentActionData({
    threadId,
    commentId,
  })

  if (!commentActionData) return notFound()

  return (
    <>
      <VoteCommentButton
        threadId={threadId}
        commentId={commentActionData.id}
        votesType="up-vote"
        votesBy={commentActionData.upVotesBy}
      />
      <VoteCommentButton
        threadId={threadId}
        commentId={commentId}
        votesType="down-vote"
        votesBy={commentActionData.downVotesBy}
      />
    </>
  )
}
