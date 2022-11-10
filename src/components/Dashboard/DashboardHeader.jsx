import React from "react";
import CalendarBtn from "../CalendarBtn";
import DarkBtn from "../DarkBtn";

const DashboardHeader = ({ className = "" }) => {
  return (
    <div className={`mt-10 flex items-center ${className}`}>
      <h2 className="text-2xl font-bold">KORMO</h2>

      {/* user action center */}
      <div className="flex gap-2 items-center ml-auto">
        <DarkBtn />
        <CalendarBtn />
      </div>
    </div>
  );
};

export default DashboardHeader;
