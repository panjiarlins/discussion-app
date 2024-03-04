import type { Meta, StoryObj } from '@storybook/react'
import LogoutButton from './logout-button'

const meta = {
  title: 'home/@sidebar/LogoutButton',
  component: LogoutButton,
} satisfies Meta<typeof LogoutButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
