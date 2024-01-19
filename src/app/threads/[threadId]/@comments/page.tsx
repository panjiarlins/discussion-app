import CommentItem from '@/components/threads/comment-item'
import api from '@/lib/api'
import { type ThreadDetail } from '@/types/thread'
import { notFound } from 'next/navigation'

export default async function Comments({
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
      <div className="flex flex-col">
        {detailThread.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            threadId={detailThread.id}
            comment={comment}
          />
        ))}
      </div>
    )
  } catch (error) {
    notFound()
  }
}
