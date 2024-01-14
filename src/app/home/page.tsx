'use client'

import ThreadItem from '@/components/home/thread-item'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getThreads } from '@/store/threadsSlice'
import { useEffect } from 'react'

export default function HomePage() {
  const threads = useAppSelector((state) => state.threads)
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getThreads())
  }, [dispatch])

  return (
    <>
      {threads.threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </>
  )
}
