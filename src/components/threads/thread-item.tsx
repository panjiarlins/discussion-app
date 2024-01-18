import CommentButton from '../home/comment-button'
import DownVoteThreadButton from '../home/down-vote-thread-button'
import UpVoteThreadButton from '../home/up-vote-thread-button'
import LoadingBar from '../ui/loading-bar'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { type ThreadDetail } from '@/types/thread'
import Image from 'next/image'
import xss from 'xss'

export default function ThreadItem({ thread }: { thread: ThreadDetail }) {
  return (
    <Card className="relative rounded-none">
      <LoadingBar scope={`threads/voteThread/${thread.id}`} />
      <CardHeader>
        <div className="flex flex-row items-center gap-4 pb-4">
          <Image
            unoptimized
            priority
            src={thread.owner.avatar}
            alt={thread.owner.name}
            width={0}
            height={0}
            className="rounded-full size-8"
          />
          <span className="font-semibold">{thread.owner.name}</span>
        </div>
        <CardTitle>{thread.title}</CardTitle>
        <CardDescription>
          <span className="flex flex-col gap-2">
            <span>
              {new Date(thread.createdAt).toLocaleString('id-ID', {
                timeZoneName: 'short',
              })}
            </span>
            <Button variant="secondary" size="sm" className="w-fit" asChild>
              <span>{thread.category}</span>
            </Button>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: xss(thread.body) }} />
      </CardContent>
      <CardFooter>
        <UpVoteThreadButton threadId={thread.id} upVotesBy={thread.upVotesBy} />
        <DownVoteThreadButton
          threadId={thread.id}
          downVotesBy={thread.downVotesBy}
        />
        <CommentButton totalComments={thread.comments.length} />
      </CardFooter>
    </Card>
  )
}
