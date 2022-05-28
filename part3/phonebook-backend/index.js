require('dotenv').config()
require('./conection')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const middlewares = require('./middlewares')

const app = express()
app.use(cors())
app.use(express.json())
app.use(
  morgan((tokens, req, res) => [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ')),
)
app.use(express.static('build'))

const getAllPeople = () => Person.find({})

app.get('/info', async (request, response) => {
  const people = await getAllPeople()
  const text = `<p>The phonebook has info for ${
    people.length
  } people</p>\n<p>${new Date()}</p>`
  response.end(text)
})

app.get('/api/persons', async (request, response) => {
  const people = await Person.find({})
  response.json(people)
})

app.get('/api/persons/:id', async (request, response, next) => {
  const { id } = request.params
  Person.findById(id)
    .then((person) => {
      if (!person) return response.status(404).end()
      response.json(person)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', async (request, response, next) => {
  const { id } = request.params
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((err) => next(err))
})
app.post('/api/persons', (request, response, next) => {
  const { body } = request

  if (!body.number || !body.name) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  const newPerson = {
    number: body.number,
    name: body.name,
  }

  const person = new Person(newPerson)
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})
app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body
  const { id } = request.params
  Person.findByIdAndUpdate(
    id,
    { number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error))
})
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
