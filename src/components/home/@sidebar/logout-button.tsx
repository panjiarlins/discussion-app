'use client'

import { Button } from '@/components/ui/button'
import signOut from '@/lib/sign-out'

export default function LogoutButton() {
  return (
    <Button
      variant="ghost"
      className="rounded-none font-bold"
      onClick={signOut}
    >
      Log out
    </Button>
  )
}
