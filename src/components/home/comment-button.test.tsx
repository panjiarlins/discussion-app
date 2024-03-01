import { render, screen, within } from '@testing-library/react'
import CommentButton from './comment-button'

/**
 * home/CommentButton component
 * - should render correctly
 */
describe('home/CommentButton component', () => {
  it('should render correctly', async () => {
    const threadId = '1'
    const totalComments = 2
    render(<CommentButton threadId={threadId} totalComments={totalComments} />)
    const commentButton = screen.getByRole('button')
    const commentIcon = within(commentButton).getByRole('img')

    expect(commentButton).toBeInTheDocument()
    expect(commentButton).toHaveAttribute(
      'href',
      `/threads/${threadId}#comments`
    )
    expect(commentButton).toHaveTextContent(`${totalComments}`)
    expect(commentIcon).toBeInTheDocument()
  })
})
