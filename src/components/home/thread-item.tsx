import { type Threads } from '@/types/thread'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import CommentButton from './comment-button'
import DownVoteButton from './down-vote-button'
import UpVoteButton from './up-vote-button'
import Link from 'next/link'

export default function ThreadItem({ thread }: { thread: Threads[number] }) {
  return (
    <Card className="rounded-none">
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
          dangerouslySetInnerHTML={{ __html: thread.body }}
          className="line-clamp-4"
        />
      </CardContent>
      <CardFooter>
        <UpVoteButton upVotesBy={thread.upVotesBy} />
        <DownVoteButton downVotesBy={thread.downVotesBy} />
        <CommentButton totalComments={thread.totalComments} />
      </CardFooter>
    </Card>
  )
}
