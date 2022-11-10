import React from "react";

const DashboardForm = () => {
  return (
    <form className="flex gap-3">
      <div className="flex-1">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="todo name"
          className="input input-bordered dark:bg-base-200 w-full"
        />
      </div>
      <div>
        <button className="btn btn-primary">Add New</button>
      </div>
    </form>
  );
};

export default DashboardForm;
