'use client'

import HeaderMenuButton from './header-menu-button'
import { UserRound } from 'lucide-react'

export default function ProfileButton() {
  // const session = await getServerSession(options)

  return (
    <HeaderMenuButton
      text="Profile"
      tooltip="Profile"
      // href={session?.user.id ? `/${session.user.id}` : ''}
      onClick={() => {}}
    >
      <UserRound />
    </HeaderMenuButton>
  )
}
