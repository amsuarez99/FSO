import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('blogs can hide and unhide', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Some author',
    url: 'Some url',
    likes: 0,
  }
  const deleteBlog = jest.fn()
  const likeBlog = jest.fn()

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        deleteBlog={deleteBlog}
        isBlogFromUser={true}
        likeBlog={likeBlog}
      />
    )
  })

  test('only title shows at start', () => {
    screen.getByText('Blog Title')
    expect(screen.queryByText(/likes/)).not.toBeInTheDocument()
  })

  test('can expand/hide to details', async () => {
    let toggleBtn = screen.getByText(/view/i)
    const user = userEvent.setup()
    await user.click(toggleBtn)

    Object.entries(blog).forEach(([, value]) => {
      screen.getByText(value, { exact: false })
    })

    toggleBtn = screen.getByText(/hide/i)
    await user.click(toggleBtn)
    expect(screen.queryByText(/likes/i)).not.toBeInTheDocument()
  })

  test('like button fires like cb', async () => {
    const toggleBtn = screen.getByText(/view/i)
    const user = userEvent.setup()
    await user.click(toggleBtn)

    const likeButton = screen.getByRole('button', { name: 'like' })
    await user.dblClick(likeButton)

    expect(likeBlog).toHaveBeenCalledTimes(2)
  })
})
