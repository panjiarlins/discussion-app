'use client'

import { Button } from '@/components/ui/button'
import signOut from '@/lib/sign-out'

export default function LogoutButton() {
  return (
    <Button
      aria-label="Log out"
      variant="ghost"
      className="rounded-none font-bold"
      onClick={signOut}
      type="button"
    >
      Log out
    </Button>
  )
}
