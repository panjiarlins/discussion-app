import { type Threads } from '@/types/threads'
import { type useSearchParams } from 'next/navigation'

export default function filterThreads(
  allThreads: Threads,
  searchParams: ReturnType<typeof useSearchParams>
) {
  let threads = allThreads
  const q = searchParams.get('q')
  const category = searchParams.get('category')

  if (q)
    threads = threads.filter(
      (thread) =>
        thread.title.toLowerCase().includes(q.toLowerCase()) ||
        thread.body.toLowerCase().includes(q.toLowerCase()) ||
        thread.category.toLowerCase().includes(q.toLowerCase())
    )

  if (category)
    threads = threads.filter((thread) => thread.category === category)

  return threads
}
