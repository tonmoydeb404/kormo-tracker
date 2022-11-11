import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createCollection,
  createData,
  deleteData,
  getCollection,
  updateData,
} from "../../utils/indexdb";

const DB = "todos";
const VERSION = 1;
const COLLECTION = "data";

export const todoApi = createApi({
  reducerPath: "todoapi",
  tagTypes: ["todos"],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTodos: builder.query({
      queryFn: async () => {
        try {
          const response = await getCollection(DB, VERSION, COLLECTION);

          // sorted data
          const sorted =
            response && response.length
              ? response?.sort((a, b) => new Date(b.date) - new Date(a.date))
              : [];

          return { data: sorted };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map((item) => ({ type: "todos", id: item.id })),
              { type: "todos", id: "all" },
            ]
          : [{ type: "todos", id: "all" }];
      },
    }),
    updateTodo: builder.mutation({
      queryFn: async (updatedTodo) => {
        try {
          const response = await updateData(
            DB,
            VERSION,
            COLLECTION,
            updatedTodo
          );
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error) => {
        return [{ type: "todos", id: result }];
      },
    }),
    deleteTodo: builder.mutation({
      queryFn: async (id) => {
        try {
          const response = await deleteData(DB, VERSION, COLLECTION, id);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error) => {
        return [{ type: "todos", id: result }];
      },
    }),
    addTodo: builder.mutation({
      queryFn: async (todo) => {
        try {
          const response = await createData(DB, VERSION, COLLECTION, todo);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: "todos", id: "all" }],
    }),
    createCollection: builder.query({
      queryFn: async () => {
        try {
          const repsonse = await createCollection(DB, VERSION, COLLECTION);

          return { data: repsonse };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetTodosQuery,
  useLazyGetTodosQuery,
  useLazyCreateCollectionQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
