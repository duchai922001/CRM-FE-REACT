import React from "react";
import Header from "../components/header/header.component";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="auth-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
