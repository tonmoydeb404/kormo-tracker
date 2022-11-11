import { configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "../features/global/globalSlice";
import { todoApi } from "../features/todo/todoApi";

export const store = configureStore({
  reducer: {
    [globalSlice.name]: globalSlice.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (defMiddleware) => defMiddleware().concat(todoApi.middleware),
});
