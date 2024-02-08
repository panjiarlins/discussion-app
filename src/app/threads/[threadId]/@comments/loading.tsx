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
                <Skeleton className="rounded-full size-8" />
                <Skeleton className="w-20 h-4" />
              </span>
              <Skeleton className="w-[5%] h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-16" />
          </CardContent>
          <CardFooter className="flex flex-row flex-wrap items-center">
            <Skeleton className="w-20 h-8 rounded-full" />
            <Skeleton className="w-20 h-8 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
