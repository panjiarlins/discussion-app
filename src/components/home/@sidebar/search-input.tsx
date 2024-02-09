'use client'

import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function SearchInput() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [text, setText] = useState(searchParams.get('q') ?? null)
  const [query] = useDebounce(text, 300)

  useEffect(() => {
    if (query !== null) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('q', query)
      router.push(pathname + '?' + params.toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, query, router])

  return (
    <Button asChild variant="secondary" className="space-x-4 rounded-full">
      <label>
        <Search />
        <input
          onChange={(event) => {
            setText(event.target.value)
          }}
          defaultValue={searchParams.get('q') ?? ''}
          type="search"
          placeholder="Search"
          className="bg-transparent outline-none size-full placeholder:text-muted-foreground"
        />
      </label>
    </Button>
  )
}
