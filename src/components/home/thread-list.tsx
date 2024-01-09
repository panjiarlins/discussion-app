'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getThreads } from '@/store/threadsSlice'
import { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import UpVoteButton from './up-vote-button'
import DownVoteButton from './down-vote-button'
import CommentButton from './comment-button'

export default function ThreadList() {
  const threads = useAppSelector((state) => state.threads)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getThreads())
  }, [dispatch])

  return (
    <section className="lg:col-span-3">
      {threads.threads.map((thread) => (
        <Card key={thread.id} className="rounded-none">
          <CardHeader>
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
            <p
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
      ))}
    </section>
  )
}
