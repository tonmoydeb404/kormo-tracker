import React, { useState } from "react";
import TodoList from "../../features/todo/TodoList";
import GenSekeleton from "../Skeleton/GenSekeleton";
import TodoSkeleton from "../Skeleton/TodoSkeleton";

// dashboard todo header
const DashboardTodoHeader = ({
  title,
  isOpen = true,
  setIsOpen = () => {},
}) => {
  return (
    <div className="flex items-center px-4 py-2 todolist_header">
      <span className="text-sm font-bold block">{title}</span>

      <button
        className="btn btn-sm btn-square btn-ghost ml-auto"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <i className={`bi ${isOpen ? "bi-dash" : "bi-plus"}`}></i>
      </button>
    </div>
  );
};

// dashboard todo body
const DashboardTodoBody = ({ data = [], isLoading = true }) => {
  // todos content
  let todosContent = "";

  // handle loading state
  if (isLoading) {
    todosContent = <GenSekeleton element={<TodoSkeleton />} count={5} />;
  }

  // handle empty data state
  if (!isLoading && data && !data.length) {
    todosContent = (
      <li className="py-3 px-4 bg-black/10 rounded">no todos are here</li>
    );
  }

  // handle data state
  if (!isLoading && data && data.length) {
    todosContent = <TodoList data={data} className="todolist_item" />;
  }

  return (
    <div className="collapse-content px-0 todolist_body">
      <ul className="flex flex-col gap-2 px-4">{todosContent}</ul>
    </div>
  );
};

// dashboard todo list
const DashboardTodoList = ({
  className = "",
  title = null,
  data = [],
  type = null,
  isLoading = true,
}) => {
  // collapse state
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        className={`todolist todolist-${type} 
        collapse rounded ${isOpen ? "collapse-open" : "collapse-close"}
        ${className}`}
      >
        <DashboardTodoHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
        />

        <DashboardTodoBody isLoading={isLoading} data={data} />
      </div>
    </div>
  );
};

export default DashboardTodoList;
