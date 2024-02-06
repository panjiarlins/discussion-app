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
    <div className="m-4 mx-auto rounded-lg bg-secondary w-fit md:min-w-[60%]">
      <div className="p-8 pb-4 text-2xl font-bold text-center">
        Active User Leaderboard
      </div>
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg text-center">User</TableHead>
              <TableHead className="text-lg text-center">Score</TableHead>
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
                    className="rounded-full size-8"
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
