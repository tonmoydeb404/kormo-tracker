import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "../features/global/globalSlice";

export const store = configureStore({
  reducer: {
    [globalSlice.name]: globalSlice.reducer,
  },
});
