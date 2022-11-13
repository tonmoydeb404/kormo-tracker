import React from "react";
import { useSelector } from "react-redux";
import { selectDateFilter } from "../global/globalSlice";
import Todo from "./Todo";
import {
  useAddRegularMutation,
  useAddTodoMutation,
  useDeleteRegularMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "./todoApi";

const TodoList = ({ data = [], className = "" }) => {
  // date filter
  const dateFilter = useSelector(selectDateFilter);
  // normal todo
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  // regular todo
  const [addRegularTodo] = useAddRegularMutation();
  const [removeRegularTodo] = useDeleteRegularMutation();

  // actions
  const deleteNormalTodo = async ({ id }) => {
    try {
      deleteTodo(id);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteRegularTodo = async ({ todo }) => {
    try {
      // structure regular todo
      const structureTodo = {
        id: todo.id,
        title: todo.title,
        createdAt: todo.createdAt,
        type: "REGULAR",
        deletedAt: dateFilter == null ? new Date().toISOString() : dateFilter,
      };
      await removeRegularTodo(structureTodo);
    } catch (error) {
      console.log(error);
    }
  };

  const createRegularTodo = async ({ todo }) => {
    try {
      console.log(todo);
      // structure regular todo
      const structureTodo = {
        id: todo.id,
        title: todo.title,
        createdAt: todo.date,
        type: "REGULAR",
        deletedAt: null,
      };
      await deleteTodo(todo.id).unwrap();
      await addRegularTodo(structureTodo).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const completeNormalTodo = async ({ complete, todo }) => {
    try {
      await updateTodo({ ...todo, isCompleted: complete });
    } catch (error) {
      console.log(error);
    }
  };
  const completeRegularTodo = async ({ complete, todo }) => {
    try {
      // todo date
      const cDate = new Date();
      const fDate = new Date(dateFilter).setHours(
        cDate.getHours(),
        cDate.getMinutes(),
        cDate.getSeconds()
      );
      const date =
        dateFilter == null
          ? cDate.toISOString()
          : new Date(fDate).toISOString();

      if (complete) {
        // structure regular todo and push this to todolist
        const structureTodo = {
          title: todo.title,
          date,
          isCompleted: true,
          type: "REGULAR",
          id: [todo.id, new Date(date).getTime()].toString(),
        };
        await addTodo(structureTodo);
      } else {
        await deleteNormalTodo({ id: todo.id });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handlers
  const handleDeleteTodo = async ({
    type = "NORMAL",
    id = null,
    todo = null,
  }) => {
    if (type == "NORMAL") {
      await deleteNormalTodo({ id });
    } else if (type == "REGULAR") {
      await deleteRegularTodo({ todo });
    }
  };

  const handleCompleteTodo = async ({ complete = null, todo = null }) => {
    if (todo?.type == "NORMAL") {
      await completeNormalTodo({ complete, todo });
    } else if (todo?.type == "REGULAR") {
      await completeRegularTodo({ complete, todo });
    }
  };

  return data && data.length ? (
    <>
      {data.map((item, index, arr) => (
        <Todo
          className={className}
          key={item.id}
          title={item.title}
          id={item.id}
          date={item.date}
          isCompleted={item.isCompleted}
          type={item.type}
          // actions
          deleteTodo={async () =>
            await handleDeleteTodo({ type: item.type, id: item.id, todo: item })
          }
          completeTodo={async (complete) =>
            await handleCompleteTodo({ complete, todo: { ...item } })
          }
          createRegularTodo={async () =>
            await createRegularTodo({ todo: { ...item } })
          }
        />
      ))}
    </>
  ) : (
    ""
  );
};

export default TodoList;
