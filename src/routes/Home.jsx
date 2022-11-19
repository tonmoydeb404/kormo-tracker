import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>This is home page</h1>
      <Link className="btn btn-primary" to={"/dashboard"}>
        Dashboard
      </Link>
    </div>
  );
};

export default Home;
