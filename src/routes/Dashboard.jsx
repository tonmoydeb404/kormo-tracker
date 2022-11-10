import React from "react";
import { useSelector } from "react-redux";
import DashboardControl from "../components/Dashboard/DashboardControl";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardTodoList from "../components/Dashboard/DashboardTodoList";
import { selectAllTodos, selectRegularTodos } from "../features/todo/todoSlice";

const Dashboard = () => {
  const regularTodos = useSelector(selectRegularTodos);
  const allTodos = useSelector(selectAllTodos);

  return (
    <>
      <div className="container">
        <DashboardHeader />
        <DashboardControl />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20">
          <DashboardTodoList
            isLoading={allTodos?.length == 0}
            data={allTodos}
            title={"Daily"}
            type="daily"
          />
          <DashboardTodoList
            isLoading={regularTodos?.length == 0}
            data={regularTodos}
            title={"Default"}
            type="default"
          />
          <DashboardTodoList
            isLoading={true}
            data={[]}
            title={"Completed"}
            type="completed"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
