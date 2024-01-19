import ThreadItem from '@/components/threads/thread-item'
import getThreadDetail from '@/utils/get-thread-detail'

export const revalidate = 0

export default async function ThreadDetailPage({
  params: { threadId },
}: {
  params: { threadId: string }
}) {
  const detailThread = await getThreadDetail(threadId)

  return <ThreadItem thread={detailThread} />
}
