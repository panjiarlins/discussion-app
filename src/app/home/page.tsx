'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getThreads } from '@/store/threadsSlice'
import { useEffect } from 'react'
import Loading from './_loading'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import LoadingBar from '@/components/ui/loading-bar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import xss from 'xss'
import VoteThreadButton from '@/components/home/vote-thread-button'
import CommentButton from '@/components/home/comment-button'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { BellRing } from 'lucide-react'

export default function Page() {
  const threads = useAppSelector((state) => state.threads)
  const isLoading = useAppSelector(
    (states) => states.loadingBar['threads/getThreads']
  )
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()

  useEffect(() => {
    void dispatch(getThreads({ searchParams }))
  }, [dispatch, searchParams])

  if (isLoading) return <Loading />

  if (threads.threads.length === 0) {
    return (
      <div className="flex h-20 flex-col items-center justify-center">
        No Threads Found
      </div>
    )
  }

  return (
    <>
      {threads.threads.map((thread) => (
        <Card key={thread.id} className="relative rounded-none">
          <LoadingBar scope={`threads/voteThread/${thread.id}`} />
          <CardHeader>
            <div className="flex flex-row items-center gap-4 pb-4">
              {thread.owner ? (
                <>
                  <Image
                    unoptimized
                    priority
                    src={thread.owner?.avatar ?? ''}
                    alt={thread.owner?.name ?? ''}
                    width={0}
                    height={0}
                    className="size-8 rounded-full"
                  />
                  <span className="font-semibold">
                    {thread.owner?.name ?? ''}
                  </span>
                </>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="animate-pulse rounded-full"
                >
                  <div className="flex flex-row items-center gap-2">
                    <BellRing className="size-6" />
                    <span>New Thread</span>
                  </div>
                </Button>
              )}
            </div>
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
          <CardFooter className="flex flex-row flex-wrap items-center">
            <VoteThreadButton
              threadId={thread.id}
              votesType="up-vote"
              votesBy={thread.upVotesBy}
            />
            <VoteThreadButton
              threadId={thread.id}
              votesType="down-vote"
              votesBy={thread.downVotesBy}
            />
            <CommentButton
              threadId={thread.id}
              totalComments={thread.totalComments}
            />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
