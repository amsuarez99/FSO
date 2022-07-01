const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Blog = require('../../models/blog')
const app = require('../../app')
const User = require('../../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const helper = {
  async blogsInDB() {
    const notes = await Blog.find({})
    return notes.map((note) => note.toJSON())
  },
  async getNonExistingId() {
    const temporaryBlog = {
      title: 'Test',
      author: 'tets',
    }

    const savedBlog = await new Blog(temporaryBlog).save()
    const parsedBlog = savedBlog.toJSON()
    const uniqueId = parsedBlog.id

    await Blog.findByIdAndDelete(uniqueId)
    return uniqueId
  },

  async usersInDb() {
    const users = await User.find({})
    return users.map((user) => user.toJSON())
  },
  initialBlogs,
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('quesadilla123', 10)
  const user = new User({ username: 'root', passwordHash })
  const savedUser = await user.save()

  const blogPromises = initialBlogs.map((blog) => {
    const blogObject = new Blog({ ...blog, user: savedUser._id })
    return blogObject.save()
  })
  await Promise.all(blogPromises)
})

describe('get all blogs', () => {
  test('correct amount of blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const returnedBlogs = response.body
    expect(returnedBlogs).toHaveLength(initialBlogs.length)
    const blogUsernames = returnedBlogs.map((blog) => blog.user.username)
    expect(blogUsernames).toContain('root')
  })

  test('the blogs have the _id property converted to id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const returnedBlogs = response.body
    returnedBlogs.forEach((blog) => {
      expect(blog._id).toBeUndefined()
      expect(blog.id)
    })
    expect(returnedBlogs)
  })
})

describe('adding a new blog', () => {
  test('succeeds with all fields present', async () => {
    const newBlog = {
      title: 'Some Weird Blog',
      author: 'Marcelo Suarez',
      url: 'someUrl.com',
      likes: 10000,
    }
    expect(await helper.blogsInDB()).toHaveLength(helper.initialBlogs.length)

    const { body: returnedBlog } = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd).toContainEqual(returnedBlog)
  })

  test('likes param is optional and defaults to 0', async () => {
    const newBlog = {
      title: 'Some Weird Blog',
      author: 'Marcelo Suarez',
      url: 'someUrl.com',
    }
    const { body: returnedBlog } = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(returnedBlog.likes).toBe(0)
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('invalid blog is not added', async () => {
    const invalidBlog = {
      url: 'someUrl.com',
      likes: 1,
    }

    const response = await api.post('/api/blogs').send(invalidBlog).expect(400)

    expect(response.body).toMatchInlineSnapshot(`
Object {
  "error": "Blog validation failed: author: Path \`author\` is required., title: Path \`title\` is required.",
}
`)
  })
})

describe('deleting a blog', () => {
  test('deletes an existing blog', async () => {
    const blogs = await helper.blogsInDB()
    const blogToDelete = blogs[0].id

    await api.delete(`/api/blogs/${blogToDelete}`).expect(410)

    const leftBlogs = await helper.blogsInDB()
    expect(leftBlogs).toHaveLength(helper.initialBlogs.length - 1)
    const wasBlogDeleted = !leftBlogs.some((blog) => blog.id === blogToDelete)
    expect(wasBlogDeleted).toBe(true)
  })

  test('has noop when deleting non existing blog', async () => {
    const nonExistingId = await helper.getNonExistingId()
    await api.delete(`/api/blogs/${nonExistingId}`).expect(404)

    const dbBlogs = await helper.blogsInDB()
    expect(dbBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update a blog', () => {
  test('it updates an existing blog', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      title: 'test',
    }

    const { body: returnedBlog } = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(returnedBlog).toMatchObject(updatedBlog)
    const blogsAtEnd = await helper.blogsInDB()
    const blogTitles = blogsAtEnd.map((blog) => blog.title)
    expect(blogTitles).toHaveLength(helper.initialBlogs.length)
    expect(blogTitles).toContain(updatedBlog.title)
  })

  test('noop on non existing blog', async () => {
    const nonExistingId = await helper.getNonExistingId()

    const updatedBlog = {
      id: nonExistingId,
      title: 'hello world',
      author: 'Marcelo',
    }

    await api.put(`/api/blogs/${nonExistingId}`).send(updatedBlog).expect(404)

    const dbBlogs = await helper.blogsInDB()
    expect(dbBlogs).toHaveLength(helper.initialBlogs.length)
  })
})

describe('when there is one user in db', () => {
  test('creation fails with an existing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      password: 'quesadilla123',
      name: 'marcelo',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/i)
    expect(response.body.error).toMatch(/username must be unique/i)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'amsua',
      name: 'marcelo',
      password: '123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/i)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('lists all users', async () => {
    const usersAtStart = await helper.usersInDb()
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-type', /application\/json/i)
    expect(response.body).toEqual(usersAtStart)

    const newUser = {
      username: 'amsua',
      name: 'marcelo',
      password: '123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/i)

    const { body: endUsers } = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-type', /application\/json/i)
    expect(endUsers).toHaveLength(usersAtStart.length + 1)
    const usernames = endUsers.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
