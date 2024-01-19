import api from '@/lib/api'
import { type ThreadDetail } from '@/types/thread'
import { cache } from 'react'

const getThreadDetail = cache(async (threadId: string) => {
  const {
    data: {
      data: { detailThread },
    },
  }: {
    data: {
      data: { detailThread: ThreadDetail }
    }
  } = await api.get(`/threads/${threadId}`)

  return detailThread
})

export default getThreadDetail
