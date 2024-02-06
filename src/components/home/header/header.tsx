import Logo from '../../../../public/_049fd1fb-231f-4466-9919-f4ac28359ee2.jpeg'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import LogoutButton from '@/components/home/header/logout-button'
import HomeButton from '@/components/home/header/home-button'
import ProfileButton from '@/components/home/header/profile-button'
import LoginButton from '@/components/home/header/login-button'
import LeaderboardsButton from './leaderboards-button'
import ThemeButton from './theme-button'

export default async function Header() {
  const session = await getServerSession(options)

  return (
    <header className="flex flex-col items-center p-2 xl:items-start">
      <Image
        priority
        src={Logo}
        alt="logo"
        width={64}
        height={64}
        className="self-center mt-1 mb-6 rounded-full"
      />
      <HomeButton />

      {session ? (
        <>
          <LeaderboardsButton />
          <ProfileButton />
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
      <ThemeButton className="self-center mt-6 mb-1 rounded-full" />
    </header>
  )
}
