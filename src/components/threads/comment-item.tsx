import { type ThreadDetail } from '@/types/thread'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Image from 'next/image'
import UpVoteCommentButton from './up-vote-comment-button'
import DownVoteCommentButton from './down-vote-comment-button'
import timeSince from '@/utils/time-since'

export default function CommentItem({
  comment,
}: {
  comment: ThreadDetail['comments'][number]
}) {
  return (
    <Card className="rounded-none">
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
        <div dangerouslySetInnerHTML={{ __html: comment.content }} />
      </CardContent>
      <CardFooter>
        <UpVoteCommentButton upVotesBy={comment.upVotesBy} />
        <DownVoteCommentButton downVotesBy={comment.downVotesBy} />
      </CardFooter>
    </Card>
  )
}
