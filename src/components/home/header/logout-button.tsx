'use client'

import signOut from '@/lib/sign-out'
import HeaderMenuButton from './header-menu-button'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  return (
    <HeaderMenuButton text="Log out" tooltip="Log out" onClick={signOut}>
      <LogOut />
    </HeaderMenuButton>
  )
}
