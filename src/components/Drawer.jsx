import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebar, setSidebar } from "../features/global/globalSlice";

const Drawer = ({ children }) => {
  // sidebar state
  const sidebar = useSelector(selectSidebar);
  // dispatcher
  const dispatch = useDispatch();
  // handle sidebar
  const hideSidebar = () => {
    dispatch(setSidebar(false));
  };

  return (
    <div className="drawer">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebar}
        readOnly
      />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          onClick={hideSidebar}
          className="drawer-overlay"
        ></label>
      </div>
    </div>
  );
};

export default Drawer;
