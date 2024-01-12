import { Button } from '@/components/ui/button'
import Logo from '../../../../public/_049fd1fb-231f-4466-9919-f4ac28359ee2.jpeg'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import LogoutButton from '@/components/home/@header/logout-button'
import HomeButton from '@/components/home/@header/home-button'
import ProfileButton from '@/components/home/@header/profile-button'

export default async function Header() {
  const session = await getServerSession(options)

  return (
    <header className="flex flex-col items-start p-2">
      <Button
        size="icon"
        className="self-center mt-1 mb-6 overflow-hidden rounded-full"
      >
        <Image src={Logo} alt="logo" className="size-full" priority />
      </Button>
      <HomeButton />
      {!!session && (
        <>
          <ProfileButton />
          <LogoutButton />
        </>
      )}
    </header>
  )
}
