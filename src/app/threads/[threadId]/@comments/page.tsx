import CommentAction from '@/components/threads/comment-action'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import LoadingBar from '@/components/ui/loading-bar'
import { getThreadComments } from '@/utils/thread'
import timeSince from '@/utils/time-since'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import xss from 'xss'

export default async function Comments({
  params: { threadId },
}: {
  params: { threadId: string }
}) {
  const { data: comments } = await getThreadComments({ threadId })

  if (!comments) return notFound()

  return (
    <div id="comments" className="flex flex-col">
      {comments.map((comment) => (
        <Card key={comment.id} className="relative rounded-none">
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
                  className="size-8 rounded-full"
                />
                <span className="font-semibold">{comment.owner.name}</span>
              </span>
              <span>{timeSince(new Date(comment.createdAt))}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: xss(comment.content) }} />
          </CardContent>
          <CardFooter className="flex flex-row flex-wrap items-center">
            <CommentAction threadId={threadId} commentId={comment.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
