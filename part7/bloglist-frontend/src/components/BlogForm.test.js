import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

import BlogForm from './BlogForm'

test('It handle submit input correctly', async () => {
  const postedBlog = {}
  const handleSubmit = jest.fn((e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    postedBlog.title = formData.get('title')
    postedBlog.author = formData.get('author')
    postedBlog.url = formData.get('url')
  })

  const blogToEnter = {
    title: 'Blog Title',
    author: 'Blog author',
    url: 'someurl.com',
  }

  render(<BlogForm handleSubmit={handleSubmit} />)

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)

  const user = userEvent.setup()
  await user.type(titleInput, blogToEnter.title)
  await user.type(authorInput, blogToEnter.author)
  await user.type(urlInput, blogToEnter.url)

  const postBtn = screen.getByRole('button', { name: /post/i })
  await user.click(postBtn)

  expect(postedBlog).toEqual(blogToEnter)
})
