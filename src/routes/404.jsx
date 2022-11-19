import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div className="flex py-32 min-h-screen flex-col items-center justify-center">
        <h2 className="text-4xl font-bold">ERROR 404</h2>
        <p className="text-sm mt-2">page not found</p>

        <Link to={"/"} className="mt-10 btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
