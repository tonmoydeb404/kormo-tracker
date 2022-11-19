import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // navigate to dashboard
  useEffect(() => {
    const isUserInitialized = localStorage.getItem("KORMO-INITIALIZED");
    console.log(isUserInitialized);

    if (isUserInitialized !== null && isUserInitialized == "true") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="container">
      <div className="flex py-32 min-h-screen flex-col sm:items-center justify-center">
        <img src="/images/logo.png" alt="" className="w-24" />

        <h2 className="font-bold text-3xl sm:text-4xl mt-6">KORMO Tracker</h2>
        <p className="mt-2 text-sm tracking-wide">
          track your daily tasks using kormo tracker app
        </p>

        <div className="flex flex-wrap items-center gap-2 mt-10">
          <Link className="btn btn-primary gap-1" to={"/dashboard"}>
            Get Started
            <i className="bi bi-arrow-right"></i>
          </Link>
          <Link className="btn btn-warning gap-1" to={"#"}>
            Github
            <i className="bi bi-github"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
