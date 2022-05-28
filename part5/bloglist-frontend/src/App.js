import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { LogIn, LogOut } from './components/Auth'
import { useEnvironment } from './hooks/useEnvironment'

const BlogApp = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h3>blogs</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <LogOut/>
    </div>
  )
}

const App = () => {
  const { user } = useEnvironment()

  return (
    <div>
      {
        !user ? <LogIn/>  : <BlogApp/>
      }
    </div>
  )
}

export default App
