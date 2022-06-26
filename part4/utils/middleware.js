const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Blog = require('../models/blog')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) next({ name: 'JsonWebTokenError', message: 'tokenId not found' })
  const dbUser = await User.findById(decodedToken.id)

  if (!dbUser) return response.status(404).json({
    error: 'Token user not found'
  })

  request.user = dbUser
  next()
}

const blogBelongsToUser = async (request, response, next) => {
  const { user } = request
  const blogId = request.params.id
  console.log(blogId)
  const blog = await Blog.findById(blogId)
  console.log(blog, user)
  if (blog.user?.toString() !== user._id.toString()) {
    return response.status(401).json({
      error: 'only the owner can delete the blog'
    })
  }
  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('Error:', error.message)
  logger.error('Error:', error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else
    if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'invalid token' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  blogBelongsToUser
}
