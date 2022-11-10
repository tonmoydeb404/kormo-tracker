import React, { useState } from "react";
import image from "../../assets/images/avatar/avatar-01.jpg";

const DashboardAuthor = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      className={`dropdown dropdown-bottom dropdown-end ${
        showDropdown ? "dropdown-open" : "dropdown-hide"
      }`}
    >
      <label
        className="m-1 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="avatar rounded-full ring-4 ring-primary">
          <div className="w-9 rounded-full">
            <img src={image} />
          </div>
        </div>
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

export default DashboardAuthor;
