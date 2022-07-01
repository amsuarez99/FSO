import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(filter, action) {
      filter = action.payload;
      return filter;
    },
    clearFilter() {
      return "";
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
