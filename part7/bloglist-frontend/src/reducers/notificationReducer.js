import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shown: false,
  content: '',
  status: null,
  timeoutId: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification(state) {
      clearTimeout(state.timeoutId)
      return initialState
    },
    showNotification(state, { payload: { content, status } }) {
      state.content = content
      state.status = status
      state.shown = true
    },
    setTimer(state, { payload: timeoutId }) {
      state.timeoutId = timeoutId
    },
  },
})

export const { clearNotification, setTimer, showNotification } =
  notificationSlice.actions

export const scheduleNotification = (content, status, time = 5000) => {
  return (dispatch) => {
    dispatch(clearNotification())
    dispatch(showNotification({ content, status }))
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time)
    dispatch(setTimer(timeoutId))
  }
}

export default notificationSlice.reducer
