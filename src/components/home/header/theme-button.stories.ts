import type { Meta, StoryObj } from '@storybook/react'
import ThemeButton from './theme-button'

const meta = {
  title: 'home/Header/ThemeButton',
  component: ThemeButton,
} satisfies Meta<typeof ThemeButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
