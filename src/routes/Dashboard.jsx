import React, { useEffect, useState } from "react";
import DashboardControl from "../components/Dashboard/DashboardControl";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardTodoList from "../components/Dashboard/DashboardTodoList";
import {
  useLazyCreateCollectionQuery,
  useLazyGetTodosQuery,
} from "../features/todo/todoApi";

const Dashboard = () => {
  const [getTodos, { isLoading, data }] = useLazyGetTodosQuery();
  const [createCollection, _] = useLazyCreateCollectionQuery();

  // initial querys
  useEffect(() => {
    (async () => {
      await createCollection();
      await getTodos();
    })();
  }, []);

  const [filteredTodos, setFilteredTodos] = useState([]);
  const [regularTodos, setRegularTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  // load todo states
  useEffect(() => {
    if (!isLoading && data && data.length) {
      // filtererd todos
      const ftodos = data.filter(
        (item) =>
          new Date(item.date).toDateString() == new Date().toDateString() &&
          !item.isRegular &&
          !item.isCompleted
      );
      // regular todos
      const rtodos = data.filter((item) => item.isRegular && !item.isCompleted);
      // completed todos
      const ctodos = data.filter(
        (item) =>
          item.isCompleted &&
          new Date(item.date).toDateString() == new Date().toDateString()
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
  }, [data, isLoading]);

  return (
    <>
      <div className="container">
        <DashboardHeader />
        <DashboardControl />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20">
          <DashboardTodoList
            isLoading={isLoading}
            data={filteredTodos}
            title={"Todays"}
            type="daily"
          />
          <DashboardTodoList
            isLoading={isLoading}
            data={regularTodos}
            title={"Default"}
            type="default"
          />
          <DashboardTodoList
            isLoading={isLoading}
            data={completedTodos}
            title={"Completed"}
            type="completed"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
