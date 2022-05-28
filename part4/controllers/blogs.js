const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middlewares = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  return response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const {body, user} = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', {username: 1, name: 1})
  response.status(201).json(populatedBlog)
})


blogsRouter.delete('/:id', middlewares.blogBelongsToUser, async (request, response) => {
  const {user} = request
  const blogId = request.params.id
  await Blog.findByIdAndDelete(blogId)
  user.blogs = user.blogs.filter((id) => id.toString() !== blogId)
  await user.save()
  response.status(410).json({
    message: 'deleted successfully'
  })
})

blogsRouter.put('/:id', middlewares.blogBelongsToUser, async (request, response) => {
  const blogToUpdate = request.params.id
  const updatedBlog = request.body
  const dbResponse = await Blog.findByIdAndUpdate(blogToUpdate, updatedBlog, { new: true })
  if (dbResponse) return response.status(200).json(dbResponse)
  return response.status(404).end()
})

module.exports = blogsRouter
