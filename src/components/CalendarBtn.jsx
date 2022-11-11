import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDateFilter,
  setDateFilter,
  toggleDateFilter,
} from "../features/global/globalSlice";

const CalendarBtn = () => {
  const date = useSelector(selectDateFilter);
  const dispatch = useDispatch();
  const setDate = (value) => {
    const newDate = new Date(value).toISOString();
    dispatch(setDateFilter(newDate));
  };

  return (
    <div className={`dropdown dropdown-bottom dropdown-end`}>
      <label tabIndex={1} className="m-1 btn btn-info btn-square text-lg">
        <i className="bi bi-calendar"></i>
      </label>

      <ul
        tabIndex={1}
        className="dropdown-content menu p-1 pb-0 shadow bg-base-100 rounded-sm border border-slate-700 min-w-[200px]"
      >
        <li>
          <label
            htmlFor="dateFilter"
            className="flex items-center justify-between"
          >
            Date filter:
            <input
              type="checkbox"
              id="dateFilter"
              className="checkbox checkbox-sm checkbox-primary"
              checked={date !== null}
              onChange={() => dispatch(toggleDateFilter())}
            />
          </label>
        </li>

        <div className={`p-0 ${date == null ? "hidden" : ""}`}>
          <ReactDatePicker
            selected={new Date(date)}
            onChange={(date) => setDate(date)}
            inline
          />
        </div>
      </ul>
    </div>
  );
};

export default CalendarBtn;
