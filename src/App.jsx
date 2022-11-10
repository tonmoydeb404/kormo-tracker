import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/styles/style.css";

import React from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "./components/Drawer";
import NotFound from "./routes/404";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";

const App = () => {
  return (
    <Drawer>
      <Routes>
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </Drawer>
  );
};

export default App;
