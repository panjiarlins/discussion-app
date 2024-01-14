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
          <Skeleton className="rounded-full size-8" />
          <Skeleton className="w-[25%] h-4" />
        </div>
        <CardTitle>
          <Skeleton className="w-[75%] h-6" />
        </CardTitle>
        <div>
          <span className="flex flex-col gap-2">
            <Skeleton className="w-[25%] h-4" />
            <Skeleton className="w-[15%] h-9" />
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-64" />
      </CardContent>
      <CardFooter>
        <Skeleton className="w-20 h-8 rounded-full" />
        <Skeleton className="w-20 h-8 rounded-full" />
        <Skeleton className="w-20 h-8 rounded-full" />
      </CardFooter>
    </Card>
  )
}
