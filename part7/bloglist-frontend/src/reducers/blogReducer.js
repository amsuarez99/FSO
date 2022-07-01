import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { scheduleNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: null,
  reducers: {
    updateBlog(state = [], { payload: nextBlog }) {
      return state.map((blog) => (blog.id === nextBlog.id ? nextBlog : blog))
    },
    appendBlog(state = [], { payload: newBlog }) {
      state.push(newBlog)
    },
    removeBlog(state = [], { payload: blogId }) {
      return state.filter((b) => b.id !== blogId)
    },
    setBlogs(_, { payload: blogs }) {
      return blogs
    },
  },
})

export const { setBlogs, removeBlog, appendBlog, updateBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const returnedBlogs = await blogService.getAll()
      dispatch(setBlogs(returnedBlogs))
    } catch (error) {
      dispatch(scheduleNotification(error.message, 'danger'))
      dispatch(setBlogs([]))
    }
  }
}

export const likeBlog = (blogId) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((b) => b.id === blogId)
    const returnedBlog = await blogService.likeBlog(blogId)
    dispatch(updateBlog(returnedBlog))
    dispatch(scheduleNotification(`Succesfully liked ${blog.title}`, 'success'))
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((b) => b.id === blogId)
    try {
      await blogService.deleteBlog(blogId)
      dispatch(removeBlog(blogId))
      dispatch(
        scheduleNotification(
          `Blog removed succesfully ${blog.title}`,
          'success'
        )
      )
    } catch {
      dispatch(scheduleNotification(`Error removing ${blog.title}`, 'danger'))
    }
  }
}

export const postBlog = (blog) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.postBlog(blog)
      console.log({ returnedBlog })
      dispatch(appendBlog(returnedBlog))
      dispatch(
        scheduleNotification(
          `A new Blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          'success'
        )
      )
    } catch (error) {
      dispatch(scheduleNotification(error.message, 'danger'))
    }
  }
}

export const commentBlog = (...args) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.commentBlog(...args)
      dispatch(updateBlog(newBlog))
      dispatch(scheduleNotification('Blog commented!', 'success'))
    } catch (error) {
      dispatch(
        scheduleNotification(
          `Error uplaoding comment ${error.message} `,
          'error'
        )
      )
    }
  }
}

export default blogSlice.reducer
