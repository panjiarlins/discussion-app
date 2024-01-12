import ThreadItem from '@/components/threads/thread-item'
import api from '@/lib/api'
import { notFound } from 'next/navigation'

export default async function ThreadDetailPage({
  params: { threadId },
}: {
  params: { threadId: string }
}) {
  try {
    const { data } = await api.get(`/threads/${threadId}`)
    return <ThreadItem thread={data.data.detailThread} />
  } catch (error) {
    notFound()
  }
}
