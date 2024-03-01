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
      role="button"
      variant="ghost"
      className="w-24 space-x-1 rounded-full"
    >
      <Link href={`/threads/${threadId}#comments`}>
        <MessageCircleMore role="img" className="size-6 stroke-primary" />
        <span>{totalComments}</span>
      </Link>
    </Button>
  )
}
