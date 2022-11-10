import React from "react";
import DashboardControl from "../components/Dashboard/DashboardControl";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardTodoList from "../components/Dashboard/DashboardTodoList";

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <DashboardHeader />
        <DashboardControl />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-20">
          <DashboardTodoList
            isLoading={false}
            data={[
              {
                id: 1,
                title:
                  "quibusdam maxime voluptatem rerum accusamus magni odio doloribus perferendis iusto",
                date: "2022-11-09T09:27:01.647Z",
                priority: "IMPORTANT",
                isCompleted: false,
              },
              {
                id: 2,
                title:
                  "dolore vel consectetur laudantium sunt ipsum totam labore ratione autem",
                date: "2022-11-10T06:18:36.393Z",
                priority: "IMPORTANT",
                isCompleted: true,
              },
              {
                id: 3,
                title:
                  "quis est labore aspernatur maiores libero ea hic possimus labore",
                date: "2022-11-07T16:55:28.242Z",
                priority: "CASUAL",
                isCompleted: true,
              },
            ]}
            title={"Daily"}
            type="daily"
          />
          <DashboardTodoList
            isLoading={true}
            data={[]}
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
