import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  all: [],
  regular: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: action.payload?.id,
        title: action.payload?.title,
        date: action.payload?.date,
        isCompleted: action.payload?.isCompleted,
      };

      state.all.push(newTodo);
    },
    removeTodo: (state, action) => {
      const id = action.payload?.id;
      const index = state.all.findIndex((item) => item.id == id);

      state.all.splice(index, 1);
    },
  },
});

// actions
export const { addTodo, removeTodo } = todoSlice.actions;
// selectors
export const selectAllTodos = (state) => state.todo.all;
export const selectRegularTodos = (state) => state.todo.redular;
export const selectTodos = (state) => state.todo;
