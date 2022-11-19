import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardControl from "../components/Dashboard/DashboardControl";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardTodoList from "../components/Dashboard/DashboardTodoList";
import { selectDateFilter } from "../features/global/globalSlice";
import {
  useLazyCreateCollectionQuery,
  useLazyGetRegularQuery,
  useLazyGetTodosQuery,
} from "../features/todo/todoApi";

const Dashboard = () => {
  // queries
  const [getTodos, { isLoading, data }] = useLazyGetTodosQuery();
  const [getRegular, { isLoading: isLoadingR, data: dataR }] =
    useLazyGetRegularQuery();
  const [createCollection] = useLazyCreateCollectionQuery();

  // initial queries
  useEffect(() => {
    (async () => {
      await createCollection().unwrap();
      // set localstorage
      localStorage.setItem("KORMO-INITIALIZED", true);
      await getTodos().unwrap();
      await getRegular().unwrap();
    })();
  }, []);

  // date filter
  const dateFilter = useSelector(selectDateFilter);

  // app states
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [regularTodos, setRegularTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  // load todo states
  useEffect(() => {
    if (!isLoading && data && data.length && dataR && !isLoadingR) {
      // filtererd todos
      const ftodos = data.filter(
        (item) =>
          (dateFilter == null ||
            new Date(item.date).toDateString() ==
              new Date(dateFilter).toDateString()) &&
          !item.isRegular &&
          !item.isCompleted
      );
      // completed todos
      const ctodos = data.filter(
        (item) =>
          item.isCompleted &&
          (dateFilter == null ||
            new Date(item.date).toDateString() ==
              new Date(dateFilter).toDateString())
      );

      // regular todos
      const rtodos = dataR.filter((item) => {
        // current date
        const currentDate =
          dateFilter == null
            ? new Date().getTime()
            : new Date(dateFilter).getTime();

        // check created at
        const createdAt = new Date(item.createdAt).setHours(0, 0, 0);
        const validCreatedAt = createdAt <= currentDate;

        // check deleted at
        const deletedAt = new Date(item.deletedAt).setHours(0, 0, 0);
        const validDeletedAt =
          item.deletedAt == null ? true : deletedAt >= currentDate;

        // check cureent todos contains this id or not
        const todoIndex = data.findIndex((todoItem) => {
          console.log({
            id: todoItem.id,
            d: [item.id, new Date(todoItem.date).getTime()].toString(),
            1: new Date(dateFilter).toDateString(),
            2: new Date(todoItem.date).toDateString(),
          });
          return (
            todoItem.id ==
              [item.id, new Date(todoItem.date).getTime()].toString() &&
            new Date(dateFilter).toDateString() ==
              new Date(todoItem.date).toDateString()
          );
        });
        const validTodo = todoIndex < 0;

        console.log({
          validCreatedAt,
          validDeletedAt,
          validTodo,
          dataR,
          todoIndex,
        });

        return validCreatedAt && validDeletedAt && validTodo;
      });

      // update states
      setFilteredTodos(ftodos);
      setCompletedTodos(ctodos);
      setRegularTodos(rtodos);
    }

    // clean up
    return () => {
      setFilteredTodos([]);
      setCompletedTodos([]);
      setRegularTodos([]);
    };
  }, [data, isLoading, dataR, isLoadingR, dateFilter]);

  // dynamic title
  let dynamicTitle = null;
  if (new Date(dateFilter).toDateString() == new Date().toDateString()) {
    dynamicTitle = "Todays";
  } else if (dateFilter == null) {
    dynamicTitle = "All";
  } else {
    dynamicTitle = new Date(dateFilter).toDateString();
  }

  return (
    <>
      <div className="container">
        <DashboardHeader />
        <DashboardControl />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20">
          <DashboardTodoList
            isLoading={isLoading}
            data={filteredTodos}
            title={dynamicTitle}
            type="primary"
          />
          <DashboardTodoList
            isLoading={isLoading}
            data={regularTodos}
            title={"Regular"}
            type="warning"
          />
          <DashboardTodoList
            isLoading={isLoading}
            data={completedTodos}
            title={"Completed"}
            type="success"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
