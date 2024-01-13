import CommentItem from '@/components/threads/comment-item'
import ThreadItem from '@/components/threads/thread-item'
import api from '@/lib/api'
import { type ThreadDetail } from '@/types/thread'
import { notFound } from 'next/navigation'

export default async function ThreadDetailPage({
  params: { threadId },
}: {
  params: { threadId: string }
}) {
  try {
    const {
      data: {
        data: { detailThread },
      },
    }: {
      data: {
        data: { detailThread: ThreadDetail }
      }
    } = await api.get(`/threads/${threadId}`)

    return (
      <>
        <ThreadItem thread={detailThread} />
        <div className="flex flex-col">
          {detailThread.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </>
    )
  } catch (error) {
    notFound()
  }
}
