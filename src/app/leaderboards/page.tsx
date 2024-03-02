import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import api from '@/lib/api'
import { type Leaderboards } from '@/types/leaderboards'
import Image from 'next/image'

export default async function Page() {
  const {
    data: {
      data: { leaderboards },
    },
  }: { data: { data: { leaderboards: Leaderboards } } } =
    await api.get('/leaderboards')

  return (
    <div className="m-4 mx-auto w-fit rounded-lg bg-secondary md:min-w-[60%]">
      <div className="p-8 pb-4 text-center text-2xl font-bold">
        Active User Leaderboard
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-lg">User</TableHead>
              <TableHead className="text-center text-lg">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboards.map((leaderboard) => (
              <TableRow key={leaderboard.user.id}>
                <TableCell className="flex flex-row items-center gap-4">
                  <Image
                    unoptimized
                    priority
                    src={leaderboard.user.avatar}
                    alt=""
                    width={0}
                    height={0}
                    className="size-8 rounded-full"
                  />
                  <span className="">{leaderboard.user.name}</span>
                </TableCell>
                <TableCell className="text-center">
                  {leaderboard.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
