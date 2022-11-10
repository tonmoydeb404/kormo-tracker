import React, { useState } from "react";

const CalendarBtn = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className={`dropdown dropdown-bottom dropdown-end ${
        showDropdown ? "dropdown-open" : "dropdown-hide"
      }`}
    >
      <label
        className="m-1 btn btn-info btn-square text-lg"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <i className="bi bi-calendar"></i>
      </label>
      {showDropdown && (
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-lg border border-slate-700 w-52">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Log out</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CalendarBtn;
