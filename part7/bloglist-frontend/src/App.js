import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import { Navigate, Routes, Route, useMatch } from 'react-router-dom'

import MainLayout from './layouts/main'

import Login from './views/auth/Login'
import UserList from './views/main/UserList'
import User from './views/main/User'
import BlogList from './views/main/BlogList'
import Blog from './views/main/Blog'

const useInitialize = (user) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [user])
}

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch
    ? users?.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs?.find((blog) => blog.id === blogMatch.params.id)
    : null

  if (user === null) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    )
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/users/:id" element={<User user={matchedUser} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="*" element={<Navigate replace to="/blogs" />} />
      </Routes>
    </MainLayout>
  )
}

export default App
