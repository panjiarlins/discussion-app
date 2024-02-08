import { Button } from '@/components/ui/button'
import { type Threads } from '@/types/threads'
import { MessageCircleMore } from 'lucide-react'
import Link from 'next/link'

export default function CommentButton({
  threadId,
  totalComments,
}: {
  threadId: Threads[number]['id']
  totalComments: number
}) {
  return (
    <Button
      asChild
      variant="ghost"
      className="space-x-1 rounded-full"
      type="button"
    >
      <Link href={`/threads/${threadId}#comments`}>
        <MessageCircleMore className="size-6 stroke-primary" />
        <span>{totalComments}</span>
      </Link>
    </Button>
  )
}
