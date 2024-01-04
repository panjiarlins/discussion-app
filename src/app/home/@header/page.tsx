import HeaderMenuButton from '@/components/home/@header/header-menu-button'
import { Button } from '@/components/ui/button'
import Logo from '../../../../public/_049fd1fb-231f-4466-9919-f4ac28359ee2.jpeg'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

export default async function Header() {
  const session = await getServerSession(options)

  return (
    <header className="flex flex-col items-center">
      <Button size="icon" className="mt-1 mb-6 overflow-hidden rounded-full ">
        <Image src={Logo} alt="logo" className="size-full" />
      </Button>
      <HeaderMenuButton text="Home" tooltip="Home" href="/home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </HeaderMenuButton>
      {!!session && (
        <HeaderMenuButton
          text="Profile"
          tooltip="Profile"
          href={`/${session.user.id}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </HeaderMenuButton>
      )}
    </header>
  )
}
