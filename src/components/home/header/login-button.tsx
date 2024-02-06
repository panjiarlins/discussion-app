import HeaderMenuButton from './header-menu-button'
import { LogIn } from 'lucide-react'

export default function LoginButton() {
  return (
    <HeaderMenuButton text="Login" tooltip="Login" href="/login">
      <LogIn />
    </HeaderMenuButton>
  )
}
