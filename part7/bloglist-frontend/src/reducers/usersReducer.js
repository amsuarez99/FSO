import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { scheduleNotification } from './notificationReducer'

const usersReducer = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers(_, { payload: users }) {
      return users
    },
  },
})

export const { setUsers } = usersReducer.actions
export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const returnedUsers = await userService.getAll()
      dispatch(setUsers(returnedUsers))
    } catch (error) {
      dispatch(scheduleNotification('Error fetching users', 'error'))
      dispatch(setUsers([]))
    }
  }
}

export default usersReducer.reducer
