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

export default function HomePage({
  searchParams: { q },
}: {
  searchParams: { q: string | null }
}) {
  const threads = useAppSelector((state) => state.threads)
  const isLoading = useAppSelector(
    (states) => states.loadingBar['threads/getThreads']
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getThreads({ q }))
  }, [dispatch, q])

  if (isLoading) return <Loading />

  return (
    <>
      {threads.threads.map((thread) => (
        <Card key={thread.id} className="relative rounded-none">
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
