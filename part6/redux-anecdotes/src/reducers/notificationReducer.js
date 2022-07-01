import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shown: false,
  content: undefined,
  timeoutId: undefined,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification(state, { payload: content }) {
      state.shown = true;
      state.content = content;
    },
    clearNotification(state) {
      clearTimeout(state.timeoutId);
      return initialState;
    },
    setTimer(state, { payload: timeoutId }) {
      state.timeoutId = timeoutId;
    },
  },
});

export const scheduleNotification = (dispatch, content) => {
  dispatch(clearNotification());
  dispatch(showNotification(content));
  const timeoutId = setTimeout(() => {
    dispatch(clearNotification());
  }, 5000);
  dispatch(setTimer(timeoutId));
};

export const { showNotification, setTimer, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
