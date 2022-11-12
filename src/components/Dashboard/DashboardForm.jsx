import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDateFilter } from "../../features/global/globalSlice";
import { useAddTodoMutation } from "../../features/todo/todoApi";

const DashboardForm = () => {
  // app state
  const [title, setTitle] = useState("");
  const [addTodo, todoResponse] = useAddTodoMutation();

  // date filter
  const dateFilter = useSelector(selectDateFilter);

  const handleTodoForm = async (e) => {
    e.preventDefault();

    // todo date
    const cDate = new Date();
    const fDate = new Date(dateFilter).setHours(
      cDate.getHours(),
      cDate.getMinutes(),
      cDate.getSeconds()
    );
    const date =
      dateFilter == null ? cDate.toISOString() : new Date(fDate).toISOString();

    // todo structure
    const newTodo = {
      id: nanoid(),
      title: title,
      date,
      isCompleted: false,
      type: "NORMAL",
    };
    await addTodo(newTodo);
    // reset state
    setTitle("");
  };

  return (
    <form className="flex gap-3" onSubmit={handleTodoForm}>
      <div className="flex-1">
        <input
          type="text"
          name="name"
          id="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="todo name"
          className="input input-bordered dark:bg-base-200 w-full"
        />
      </div>
      <div>
        <button className="btn hidden sm:inline-flex btn-primary" type="submit">
          Add New
        </button>
        <button className="btn sm:hidden btn-primary" type="submit">
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </form>
  );
};

export default DashboardForm;
