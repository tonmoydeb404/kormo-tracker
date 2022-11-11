import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardControl from "../components/Dashboard/DashboardControl";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardTodoList from "../components/Dashboard/DashboardTodoList";
import { selectDateFilter } from "../features/global/globalSlice";
import {
  useLazyCreateCollectionQuery,
  useLazyGetTodosQuery,
} from "../features/todo/todoApi";

const Dashboard = () => {
  // queries
  const [getTodos, { isLoading, data }] = useLazyGetTodosQuery();
  const [createCollection, _] = useLazyCreateCollectionQuery();

  // initial queries
  useEffect(() => {
    (async () => {
      await createCollection();
      await getTodos();
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
    if (!isLoading && data && data.length) {
      // filtererd todos
      const ftodos = data.filter(
        (item) =>
          (dateFilter == null ||
            new Date(item.date).toDateString() ==
              new Date(dateFilter).toDateString()) &&
          !item.isRegular &&
          !item.isCompleted
      );
      // regular todos
      const rtodos = data.filter((item) => item.isRegular && !item.isCompleted);
      // completed todos
      const ctodos = data.filter(
        (item) =>
          item.isCompleted &&
          (dateFilter == null ||
            new Date(item.date).toDateString() ==
              new Date(dateFilter).toDateString())
      );

      // update states
      setFilteredTodos(ftodos);
      setRegularTodos(rtodos);
      setCompletedTodos(ctodos);
    }

    // clean up
    return () => {
      setFilteredTodos([]);
      setRegularTodos([]);
      setCompletedTodos([]);
    };
  }, [data, isLoading, dateFilter]);

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
