const {
  dummy, favoriteBlog, totalLikes, mostBlogs, mostLikes,
} = require('../listHelper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty lists is zero', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes([blogs[0]])
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns the most liked blog', () => {
    const result = favoriteBlog(blogs)
    expect(result).toBe(blogs[2])
  })

  test('returns undefined on empty list', () => {
    const result = favoriteBlog([])
    expect(result).toBe(undefined)
  })

  test('returns the only blog if list with one item', () => {
    const result = favoriteBlog([blogs[0]])
    expect(result).toEqual(blogs[0])
  })
})

describe('most blogs', () => {
  test('returns undefined if there are no blogs', () => {
    const result = mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('returns the count of blogs if there are only blogs of one person', () => {
    const result = mostBlogs([...blogs].splice(3))
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })

  test('returns the person with most blogs ', () => {
    const result = mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('returns undefined if there are no blogs', () => {
    expect(mostLikes([])).toBe(undefined)
  })

  test('returns the most liked post of a large list', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
  // TODO: Test many authors with the same likes
})