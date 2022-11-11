import React, { useState } from "react";
import Todo from "../../features/todo/Todo";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../../features/todo/todoApi";
import GenSekeleton from "../Skeleton/GenSekeleton";
import TodoSkeleton from "../Skeleton/TodoSkeleton";

// dashboard todo header
const DashboardTodoHeader = ({
  title,
  isOpen = true,
  setIsOpen = () => {},
}) => {
  return (
    <div className="flex items-center px-4">
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
  const [updateTodo, updateResponse] = useUpdateTodoMutation();
  const [deleteTodo, deleteResponse] = useDeleteTodoMutation();

  // handle todo complete
  const handleTodoComplete = (isCompleted, todo) => {
    updateTodo({ ...todo, isCompleted });
  };
  // handle todo delete
  const handleTodoDelete = (id) => {
    deleteTodo(id);
  };
  // handle todo regular
  const handleTodoRegular = (isRegular, todo) => {
    updateTodo({ ...todo, isRegular });
  };

  // todos content
  let todosContent = "";
  // handle loading state
  if (!isLoading) {
    todosContent =
      data && data.length ? (
        data.map((item, index, arr) => (
          <Todo
            key={item.id}
            title={item.title}
            id={item.id}
            checked={item.isCompleted}
            isRegular={item.isRegular}
            lastChild={arr.length - index <= 1}
            handleTodoComplete={(isChecked) =>
              handleTodoComplete(isChecked, item)
            }
            handleTodoRegular={(isRegular) =>
              handleTodoRegular(isRegular, item)
            }
            handleTodoDelete={() => handleTodoDelete(item.id)}
          />
        ))
      ) : (
        <li className="py-3 px-4 bg-black/10 rounded">no todos are here</li>
      );
  } else {
    todosContent = <GenSekeleton element={<TodoSkeleton />} count={5} />;
  }

  return (
    <div className="collapse-content px-0">
      <ul className="flex flex-col gap-2 mt-5 px-4">{todosContent}</ul>
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
        className={`py-4 rounded todo_list-${type} 
        collapse ${isOpen ? "collapse-open overflow-auto" : "collapse-close"}
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
