import type { Meta, StoryObj } from '@storybook/react'
import CommentButton from './comment-button'

const meta = {
  title: 'home/CommentButton',
  component: CommentButton,
} satisfies Meta<typeof CommentButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    threadId: '1',
    totalComments: 2,
  },
}
