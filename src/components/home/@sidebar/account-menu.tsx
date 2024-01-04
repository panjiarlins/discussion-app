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

export default async function AccountMenu() {
  const session = await getServerSession(options)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className="flex flex-row h-16 gap-4 rounded-full"
        >
          <Image
            src={session?.user.image ?? ''}
            alt={session?.user.name ?? ''}
            width={0}
            height={0}
            className="rounded-full size-10"
            unoptimized
            priority
          />
          <div className="flex-1 text-left font-bold truncate">
            {session?.user.name}
          </div>
          <Button asChild size="icon" variant="link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col rounded-3xl px-0 overflow-hidden">
        <Button variant="ghost" className="rounded-none font-bold">
          Edit Account
        </Button>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  )
}
