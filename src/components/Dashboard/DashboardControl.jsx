import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../features/global/globalSlice";
import DashboardForm from "./DashboardForm";

const DashboardControl = () => {
  // dispatcher
  const dispatch = useDispatch();
  // handle sidebar
  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex items-center mt-10 gap-2">
      <DashboardForm />

      <div className="sm:ml-auto"></div>
    </div>
  );
};

export default DashboardControl;
