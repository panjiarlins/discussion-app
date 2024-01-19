import { getServerSession } from 'next-auth'
import HeaderMenuButton from './header-menu-button'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { UserRound } from 'lucide-react'

export default async function ProfileButton() {
  const session = await getServerSession(options)

  return (
    <HeaderMenuButton
      text="Profile"
      tooltip="Profile"
      href={session?.user.id ? `/${session.user.id}` : ''}
    >
      <UserRound />
    </HeaderMenuButton>
  )
}
