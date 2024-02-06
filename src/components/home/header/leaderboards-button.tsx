import HeaderMenuButton from './header-menu-button'
import { BarChart3 } from 'lucide-react'

export default function LeaderboardsButton() {
  return (
    <HeaderMenuButton
      text="Leaderboards"
      tooltip="Leaderboards"
      href="/leaderboards"
    >
      <BarChart3 />
    </HeaderMenuButton>
  )
}
