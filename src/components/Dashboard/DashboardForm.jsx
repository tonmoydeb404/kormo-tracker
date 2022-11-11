import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useAddTodoMutation } from "../../features/todo/todoApi";

const DashboardForm = () => {
  // app state
  const [title, setTitle] = useState("");
  const [addTodo, todoResponse] = useAddTodoMutation();

  const handleTodoForm = async (e) => {
    e.preventDefault();
    const newTodo = {
      id: nanoid(),
      title: title,
      date: new Date().toISOString(),
      isCompleted: false,
      isRegular: false,
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
        <button className="btn btn-primary" type="submit">
          Add New
        </button>
      </div>
    </form>
  );
};

export default DashboardForm;
