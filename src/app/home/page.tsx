'use client'

import ThreadItem from '@/components/home/thread-item'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getThreads } from '@/store/threadsSlice'
import { useEffect } from 'react'
import Loading from './_loading'

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
        <ThreadItem key={thread.id} thread={thread} />
      ))}
    </>
  )
}
