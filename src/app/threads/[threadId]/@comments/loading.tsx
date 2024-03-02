import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div>
      {[1, 2].map((card) => (
        <Card key={card} className="rounded-none">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <span className="flex flex-row items-center gap-4">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </span>
              <Skeleton className="h-4 w-[5%]" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full" />
          </CardContent>
          <CardFooter className="flex flex-row flex-wrap items-center">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
