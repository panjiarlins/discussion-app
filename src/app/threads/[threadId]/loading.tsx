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
    <Card className="rounded-none">
      <CardHeader>
        <div className="flex flex-row items-center gap-4 pb-4">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-4 w-[25%]" />
        </div>
        <CardTitle>
          <Skeleton className="h-6 w-[75%]" />
        </CardTitle>
        <div>
          <span className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[25%]" />
            <Skeleton className="h-9 w-[15%]" />
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-64 w-full" />
      </CardContent>
      <CardFooter className="flex flex-row flex-wrap items-center">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </CardFooter>
    </Card>
  )
}
