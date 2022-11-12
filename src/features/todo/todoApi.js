import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createCollections,
  createData,
  deleteData,
  getCollection,
  updateData,
} from "../../utils/indexdb";

const DB = "todos";
const VERSION = 3;
const ALL = "all";
const REGULAR = "regular";

export const todoApi = createApi({
  reducerPath: "todoapi",
  tagTypes: ["all", "regular"],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getTodos: builder.query({
      queryFn: async () => {
        try {
          const response = await getCollection(DB, VERSION, ALL);

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
              { type: "todos", id: "LIST" },
            ]
          : [{ type: "todos", id: "LIST" }];
      },
    }),
    updateTodo: builder.mutation({
      queryFn: async (updatedTodo) => {
        try {
          const response = await updateData(DB, VERSION, ALL, updatedTodo);
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
          const response = await deleteData(DB, VERSION, ALL, id);
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
          const response = await createData(DB, VERSION, ALL, todo);
          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: "todos", id: "LIST" }],
    }),
    createCollection: builder.query({
      queryFn: async () => {
        try {
          const repsonse = await createCollections(DB, VERSION, [ALL, REGULAR]);

          return { data: repsonse };
        } catch (error) {
          return { error };
        }
      },
    }),
    // handle regular
    getRegular: builder.query({
      queryFn: async () => {
        try {
          const response = await getCollection(DB, VERSION, REGULAR);

          // sorted data
          const sorted =
            response && response.length
              ? response?.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )
              : [];

          return { data: sorted };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result) => {
        return result
          ? [
              ...result.map((item) => ({ type: "regular", id: item.id })),
              { type: "regular", id: "LIST" },
            ]
          : [{ type: "regular", id: "LIST" }];
      },
    }),
    addRegular: builder.mutation({
      queryFn: async (todo) => {
        try {
          // post data to db
          const response = await createData(DB, VERSION, REGULAR, todo);

          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: [{ type: "regular", id: "LIST" }],
    }),
    deleteRegular: builder.mutation({
      queryFn: async (todo) => {
        try {
          // update data to db
          const response = await updateData(DB, VERSION, REGULAR, todo);

          return { data: response };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error) => {
        return [{ type: "regular", id: result }];
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
  useAddRegularMutation,
  useDeleteRegularMutation,
  useLazyGetRegularQuery,
} = todoApi;
