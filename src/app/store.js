import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "../features/global/globalSlice";
import { todoSlice } from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    [globalSlice.name]: globalSlice.reducer,
    [todoSlice.name]: todoSlice.reducer,
  },
});
