const { groupBy, maxBy, reduce } = require('lodash')

const dummy = (_blogs) => 1
const totalLikes = (blogs) => blogs.reduce((prevLikes, blog) => prevLikes + blog.likes, 0)
const favoriteBlog = (blogs) => {
  if (!blogs.length) return
  return blogs.reduce((mostLikedBlog, blog) => {
    if (mostLikedBlog.likes < blog.likes) return blog
    return mostLikedBlog
  })
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return
  const authorsBlogs = groupBy(blogs, 'author')
  const authorWithMostBlogs = Object.entries(authorsBlogs)
    .reduce((mostAuthorBlogs, [author, authorBlogs]) => {
      if ((mostAuthorBlogs?.blogs ?? 0) < authorBlogs.length) {
        return {
          author,
          blogs: authorBlogs.length,
        }
      }

      return mostAuthorBlogs
    }, {})
  return authorWithMostBlogs
}

const mostLikes = (allBlogs) => {
  if (!allBlogs.length) return
  const authorsBlogs = groupBy(allBlogs, 'author')
  const mostAuthorLikes = reduce(authorsBlogs, (mostlikedAuthor, authorBlogs, key) => {
    const authorLikes = totalLikes(authorBlogs)
    if ((mostlikedAuthor?.likes ?? 0) < authorLikes) {
      return {
        author: key,
        likes: authorLikes,
      }
    }
    return mostlikedAuthor
  }, {})
  return mostAuthorLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
