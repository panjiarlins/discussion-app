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
            <CardTitle>
              <Skeleton className="w-[75%] h-6" />
            </CardTitle>
            <span className="flex flex-col gap-2">
              <Skeleton className="w-[25%] h-4" />
              <Skeleton className="w-[10%] h-8" />
            </span>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-16" />
          </CardContent>
          <CardFooter className="flex flex-row flex-wrap items-center">
            <Skeleton className="w-20 h-8 rounded-full" />
            <Skeleton className="w-20 h-8 rounded-full" />
            <Skeleton className="w-20 h-8 rounded-full" />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
