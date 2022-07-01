const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middlewares = require('../utils/middleware')

blogsRouter.post(
  '/comment/:id',
  middlewares.userExtractor,
  async (request, response) => {
    const { id } = request.params
    const { body } = request
    if (typeof body.comment !== 'string') return response.status(422).end()
    console.log('hello')
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: body.comment } },
      { new: true }
    )
    console.log(updatedBlog)
    return response.status(200).json(updatedBlog)
  }
)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body, user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: [],
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
  })
  response.status(201).json(populatedBlog)
})

blogsRouter.delete(
  '/:id',
  middlewares.blogBelongsToUser,
  async (request, response) => {
    const { user } = request
    const blogId = request.params.id
    await Blog.findByIdAndDelete(blogId)
    user.blogs = user.blogs.filter((id) => id.toString() !== blogId)
    await user.save()
    response.status(200).json({
      message: 'deleted successfully',
    })
  }
)

blogsRouter.put('/like/:id', async (request, response) => {
  const blogToUpdate = request.params.id
  const savedBlog = await Blog.findByIdAndUpdate(
    blogToUpdate,
    { $inc: { likes: 1 } },
    { new: true }
  )
  const populatedBlog = await savedBlog.populate('user', {
    username: 1,
    name: 1,
  })
  if (populatedBlog) return response.status(200).json(populatedBlog)
  return response.status(404).end()
})

blogsRouter.put(
  '/:id',
  middlewares.blogBelongsToUser,
  async (request, response) => {
    const blogToUpdate = request.params.id
    const updatedBlog = request.body
    const dbResponse = await Blog.findByIdAndUpdate(blogToUpdate, updatedBlog, {
      new: true,
    })
    if (dbResponse) return response.status(200).json(dbResponse)
    return response.status(404).end()
  }
)

module.exports = blogsRouter
