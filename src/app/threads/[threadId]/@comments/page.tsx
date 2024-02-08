import CommentItem from '@/components/threads/comment-item'
import getThreadDetail from '@/utils/get-thread-detail'

export const revalidate = 0

export default async function Comments({
  params: { threadId },
}: {
  params: { threadId: string }
}) {
  const detailThread = await getThreadDetail(threadId)

  return (
    <div id="comments" className="flex flex-col">
      {detailThread.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          threadId={detailThread.id}
          comment={comment}
        />
      ))}
    </div>
  )
}
