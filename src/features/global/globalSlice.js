import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    darkTheme: true,
    dateFilter: new Date().toISOString(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    setDarkTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
    setDateFilter: (state, action) => {
      state.dateFilter = action.payload;
    },
    toggleDateFilter: (state) => {
      state.dateFilter =
        state.dateFilter == null ? new Date().toISOString() : null;
    },
  },
});

// actions
export const { toggleTheme, setDarkTheme, setDateFilter, toggleDateFilter } =
  globalSlice.actions;

// selectors
export const selectGlobal = (state) => state.global;
export const selectDarkTheme = (state) => state.global.darkTheme;
export const selectDateFilter = (state) => state.global.dateFilter;
