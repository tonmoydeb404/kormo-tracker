import React from "react";

const TodoOptions = ({
  index = 0,
  handleTodoDelete,
  handleTodoRegular,
  isRegular,
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
        {isRegular ? (
          <li>
            <span onClick={() => handleTodoRegular(false)}>
              <i className="bi bi-bookmark-dash"></i>
              remove from regular
            </span>
          </li>
        ) : (
          <li>
            <span onClick={() => handleTodoRegular(true)}>
              <i className="bi bi-bookmark"></i>
              mark as regular
            </span>
          </li>
        )}
        <li>
          <span onClick={handleTodoDelete}>
            <i className="bi bi-trash "></i>
            delete todo
          </span>
        </li>
      </ul>
    </div>
  );
};

const Todo = ({
  title = null,
  checked = undefined,
  isRegular = false,
  id = null,
  lastChild = false,
  handleTodoComplete = () => {},
  handleTodoDelete = () => {},
  handleTodoRegular = () => {},
  className = "",
}) => {
  return (
    <li
      className={`flex items-center gap-2 select-none py-2 px-3 cursor-pointer rounded duration-300 group ${className}`}
      data-last={lastChild}
    >
      <input
        type="checkbox"
        className={`checkbox checkbox-xs`}
        id={id}
        checked={checked}
        onChange={() => handleTodoComplete(!checked)}
      />
      <label htmlFor={id} className="text-sm ml-1 cursor-pointer">
        {title}
      </label>
      <TodoOptions
        handleTodoDelete={handleTodoDelete}
        isRegular={isRegular}
        handleTodoRegular={handleTodoRegular}
      />
    </li>
  );
};

export default Todo;

// bg-black/10 dark:bg-slate-50/10 hover:bg-black/20
