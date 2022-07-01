import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import authService from '../services/auth'
import { scheduleNotification } from './notificationReducer'

const getInitialUser = () => {
  const loggedUser = window.localStorage.getItem('blogUser')
  if (!loggedUser) return null
  const user = JSON.parse(loggedUser)
  blogService.setToken(user.token)
  return user
}

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialUser(),
  reducers: {
    setUser(_, { payload: user }) {
      return user
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await authService.login(credentials)
      window.localStorage.setItem('blogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(
        scheduleNotification(`${user.username} has logged in`, 'success')
      )
    } catch (error) {
      dispatch(scheduleNotification('Could not log in', 'danger'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('blogUser')
    blogService.setToken(null)
    dispatch(clearUser())
  }
}

export default userSlice.reducer
