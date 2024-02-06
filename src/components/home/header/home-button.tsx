import { Home } from 'lucide-react'
import HeaderMenuButton from './header-menu-button'

export default function HomeButton() {
  return (
    <HeaderMenuButton text="Home" tooltip="Home" href="/home">
      <Home />
    </HeaderMenuButton>
  )
}
