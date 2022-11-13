import React from "react";

const TodoOptions = ({
  index = 0,
  deleteTodo = async () => {},
  type = "NORMAL",
  createRegularTodo = async () => {},
}) => {
  return (
    <div className="dropdown dropdown-end ml-auto">
      <label tabIndex={index} className="btn btn-sm btn-square btn-ghost">
        <i className="bi bi-three-dots"></i>
      </label>

      <ul
        tabIndex={index}
        className="dropdown-content bg-base-300 border border-slate-700 menu menu-compact shadow rounded w-52"
      >
        <li className={type == "REGULAR" ? "hidden" : ""}>
          <span onClick={createRegularTodo}>
            <i className="bi bi-bookmark"></i>
            mark as regular
          </span>
        </li>
        <li>
          <span onClick={deleteTodo}>
            <i className="bi bi-trash "></i>
            delete todo
          </span>
        </li>
      </ul>
    </div>
  );
};

const Todo = ({
  className = "",
  id = null,
  title = null,
  type = "NORMAL",
  date = null,
  isCompleted = false,
  // actions
  deleteTodo = async () => {},
  completeTodo = async () => {},
  createRegularTodo = async () => {},
}) => {
  return (
    <li
      className={`flex items-center gap-2 select-none py-2 px-3  cursor-pointer rounded duration-300 group ${className}`}
    >
      <input
        type="checkbox"
        className={`checkbox checkbox-xs`}
        id={id}
        checked={Boolean(isCompleted)}
        onChange={async (e) => await completeTodo(e.target.checked)}
      />
      <label htmlFor={id} className="text-sm ml-1 cursor-pointer py-1.5">
        {title}
      </label>
      {!isCompleted && (
        <TodoOptions
          deleteTodo={deleteTodo}
          type={type}
          createRegularTodo={createRegularTodo}
        />
      )}
    </li>
  );
};

export default Todo;
