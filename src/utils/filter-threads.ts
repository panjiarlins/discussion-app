import { type Threads } from '@/types/threads'
import { type useSearchParams } from 'next/navigation'

/**
 * Filters the given threads based on the search parameters.
 *
 * @param {Threads} allThreads - the array of threads to filter
 * @param {ReturnType<typeof useSearchParams> | URLSearchParams} searchParams - the search parameters to filter the threads
 * @return {Threads} the filtered threads based on the search parameters
 */
export default function filterThreads(
  allThreads: Threads,
  searchParams: ReturnType<typeof useSearchParams> | URLSearchParams
): Threads {
  const q = searchParams.get('q')
  const category = searchParams.get('category')

  return allThreads.filter((thread) => {
    if (
      q &&
      !(
        thread.title.toLowerCase().includes(q.toLowerCase()) ||
        thread.body.toLowerCase().includes(q.toLowerCase()) ||
        thread.category.toLowerCase().includes(q.toLowerCase())
      )
    ) {
      return false // Filter out the thread
    }

    if (category && thread.category !== category) {
      return false // Filter out the thread
    }

    return true // Keep the thread
  })
}
