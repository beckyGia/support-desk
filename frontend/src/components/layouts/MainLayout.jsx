import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";

const MainLayout = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
