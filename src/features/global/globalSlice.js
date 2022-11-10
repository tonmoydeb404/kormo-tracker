import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    darkTheme: true,
    sidebar: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    setDarkTheme: (state, action) => {
      state.darkTheme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

// actions
export const { toggleTheme, toggleSidebar, setDarkTheme, setSidebar } =
  globalSlice.actions;

// selectors
export const selectGlobal = (state) => state.global;
export const selectDarkTheme = (state) => state.global.darkTheme;
export const selectSidebar = (state) => state.global.sidebar;
