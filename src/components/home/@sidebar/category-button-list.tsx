'use client'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function CategoryButtonList() {
  const { allThreads } = useAppSelector((state) => state.threads)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Button
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString())
          params.delete('category')
          router.push(pathname + '?' + params.toString())
        }}
        variant={searchParams.get('category') ? 'secondary' : 'default'}
        size="sm"
        type="button"
      >
        All
      </Button>
      {allThreads.map((thread) => (
        <Button
          key={thread.id}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('category', thread.category)
            router.push(pathname + '?' + params.toString())
          }}
          variant={
            searchParams.get('category') === thread.category
              ? 'default'
              : 'secondary'
          }
          size="sm"
          type="button"
        >
          #{thread.category}
        </Button>
      ))}
    </div>
  )
}
