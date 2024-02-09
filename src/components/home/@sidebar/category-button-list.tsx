'use client'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/store/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function CategoryButtonList() {
  const { allThreads } = useAppSelector((state) => state.threads)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const categories = useMemo(
    () => Array.from(new Set(allThreads.map((thread) => thread.category))),
    [allThreads]
  )

  return (
    <div className="flex flex-row flex-wrap gap-2 overflow-auto max-h-32 lg:max-h-96">
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
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('category', category)
            router.push(pathname + '?' + params.toString())
          }}
          variant={
            searchParams.get('category') === category ? 'default' : 'secondary'
          }
          size="sm"
          type="button"
        >
          #{category}
        </Button>
      ))}
    </div>
  )
}
