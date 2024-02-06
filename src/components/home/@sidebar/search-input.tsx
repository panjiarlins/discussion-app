import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function SearchInput() {
  return (
    <Button asChild variant="secondary" className="space-x-4 rounded-full">
      <label>
        <Search />
        <input
          type="search"
          placeholder="Search"
          className="bg-transparent outline-none size-full placeholder:text-muted-foreground"
        />
      </label>
    </Button>
  )
}
