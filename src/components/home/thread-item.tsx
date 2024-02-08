import { type Threads } from '@/types/threads'
import { Button } from '../ui/button'
import LoadingBar from '../ui/loading-bar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import CommentButton from './comment-button'
import Link from 'next/link'
import UpVoteThreadButton from './up-vote-thread-button'
import DownVoteThreadButton from './down-vote-thread-button'
import xss from 'xss'

export default function ThreadItem({ thread }: { thread: Threads[number] }) {
  return (
    <Card className="relative rounded-none">
      <LoadingBar scope={`threads/voteThread/${thread.id}`} />
      <CardHeader>
        <CardTitle>
          <Link href={`/threads/${thread.id}`}>{thread.title}</Link>
        </CardTitle>
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
        <div
          dangerouslySetInnerHTML={{ __html: xss(thread.body) }}
          className="line-clamp-4"
        />
      </CardContent>
      <CardFooter>
        <UpVoteThreadButton threadId={thread.id} upVotesBy={thread.upVotesBy} />
        <DownVoteThreadButton
          threadId={thread.id}
          downVotesBy={thread.downVotesBy}
        />
        <CommentButton
          threadId={thread.id}
          totalComments={thread.totalComments}
        />
      </CardFooter>
    </Card>
  )
}
