import React from "react";

const TodoOptions = ({ index = 0 }) => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={index} className="btn btn-sm btn-square btn-ghost">
        <i className="bi bi-three-dots"></i>
      </label>

      <ul
        tabIndex={index}
        className="dropdown-content bg-base-300 border border-slate-700 menu menu-compact shadow rounded w-52"
      >
        <li>
          <span>
            <i className="bi bi-bookmark "></i>
            mark as default
          </span>
        </li>
        <li>
          <span>
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
  onChange = () => {},
  checked = undefined,
  id = null,
  index = 0,
  lastChild = false,
}) => {
  return (
    <li
      className="flex items-center gap-2 select-none py-2 px-3 cursor-pointer rounded bg-black/10 dark:bg-slate-50/10 hover:bg-black/20 duration-300 group"
      data-last={lastChild}
    >
      <input
        type="checkbox"
        className={`checkbox checkbox-xs`}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="text-sm ml-1 cursor-pointer group-hover:text-white"
      >
        {title}
      </label>
      <TodoOptions />
    </li>
  );
};

export default Todo;
