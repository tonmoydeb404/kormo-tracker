import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkTheme, setDarkTheme } from "../features/global/globalSlice";

const DarkBtn = () => {
  // dark theme state
  const isDark = useSelector(selectDarkTheme);
  // dispatcher
  const dispatch = useDispatch();

  // handle dark mode
  const handleDark = (bool) => {
    dispatch(setDarkTheme(bool));
  };

  // gen theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
    }
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <label className="swap swap-rotate btn btn-square text-xl">
      <input
        type="checkbox"
        checked={isDark}
        onChange={(e) => handleDark(e.target.checked)}
      />

      <i className="swap-on bi bi-moon"></i>

      <i className="swap-off bi bi-sun"></i>
    </label>
  );
};

export default DarkBtn;
