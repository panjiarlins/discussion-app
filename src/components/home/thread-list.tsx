'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getThreads } from '@/store/threadsSlice'
import { useEffect } from 'react'
import ThreadItem from './thread-item'

export default function ThreadList() {
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
