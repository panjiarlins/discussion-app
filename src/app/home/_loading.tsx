import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      {[1, 2].map((card) => (
        <Card key={card} className="relative rounded-none">
          <CardHeader>
            <div className="flex flex-row items-center gap-4 pb-4">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-4 w-[25%]" />
            </div>
            <CardTitle>
              <Skeleton className="h-6 w-[75%]" />
            </CardTitle>
            <span className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[25%]" />
              <Skeleton className="h-8 w-[10%]" />
            </span>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full" />
          </CardContent>
          <CardFooter className="flex flex-row flex-wrap items-center">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
