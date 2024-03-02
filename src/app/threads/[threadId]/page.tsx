import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import LoadingBar from '@/components/ui/loading-bar'
import Image from 'next/image'
import xss from 'xss'
import { getThreadDetail } from '@/utils/thread'
import { notFound } from 'next/navigation'
import ThreadDetailAction from '@/components/threads/thread-detail-action'

export default async function Page({
  params: { threadId },
}: {
  params: { threadId: string }
}) {
  const { data: thread } = await getThreadDetail({ threadId })

  if (!thread) {
    return notFound()
  }

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
            className="size-8 rounded-full"
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
      <CardFooter className="flex flex-row flex-wrap items-center">
        <ThreadDetailAction threadId={thread.id} />
      </CardFooter>
    </Card>
  )
}
