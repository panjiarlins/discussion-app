import { type ThreadDetail } from '@/types/threads'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import timeSince from '@/utils/time-since'
import xss from 'xss'
import LoadingBar from '../ui/loading-bar'
import dynamic from 'next/dynamic'
import { Skeleton } from '../ui/skeleton'

const UpVoteCommentButton = dynamic(
  async () => await import('./up-vote-comment-button'),
  { ssr: false, loading: () => <Skeleton className="w-16 h-10 rounded-full" /> }
)

const DownVoteCommentButton = dynamic(
  async () => await import('./down-vote-comment-button'),
  { ssr: false, loading: () => <Skeleton className="w-16 h-10 rounded-full" /> }
)

export default function CommentItem({
  threadId,
  comment,
}: {
  threadId: ThreadDetail['id']
  comment: ThreadDetail['comments'][number]
}) {
  return (
    <Card className="relative rounded-none">
      <LoadingBar scope={`threads/${threadId}/voteComment/${comment.id}`} />
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row items-center gap-4">
            <Image
              unoptimized
              priority
              src={comment.owner.avatar}
              alt={comment.owner.name}
              width={0}
              height={0}
              className="rounded-full size-8"
            />
            <span className="font-semibold">{comment.owner.name}</span>
          </span>
          <span>{timeSince(new Date(comment.createdAt))}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: xss(comment.content) }} />
      </CardContent>
      <CardFooter>
        <UpVoteCommentButton
          threadId={threadId}
          commentId={comment.id}
          upVotesBy={comment.upVotesBy}
        />
        <DownVoteCommentButton
          threadId={threadId}
          commentId={comment.id}
          downVotesBy={comment.downVotesBy}
        />
      </CardFooter>
    </Card>
  )
}
