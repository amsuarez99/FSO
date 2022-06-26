const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // password is undefined
  if (password === undefined) return response.status(400).json({ error: 'Password must be present' })
  if (password.length < 3) return response.status(400).json({ error: 'Password must be ' })

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'Username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()
  return response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  return response.status(200).json(users)
})

module.exports = usersRouter
