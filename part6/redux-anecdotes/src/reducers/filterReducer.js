import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter(filter, action) {
      console.log("filter changed to ", action.payload);
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
