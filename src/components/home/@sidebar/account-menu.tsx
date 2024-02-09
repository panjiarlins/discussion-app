import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import LogoutButton from './logout-button'
import { MoreHorizontal } from 'lucide-react'

export default async function AccountMenu() {
  const session = await getServerSession(options)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="flex flex-row h-16 gap-4 rounded-full w-full"
          type="button"
        >
          <Image
            unoptimized
            priority
            src={session?.user.image ?? ''}
            alt={session?.user.name ?? ''}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1 font-bold text-left truncate">
            {session?.user.name}
          </div>
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col px-0 overflow-hidden rounded-3xl">
        <Button variant="ghost" className="font-bold rounded-none">
          Edit Account
        </Button>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  )
}
