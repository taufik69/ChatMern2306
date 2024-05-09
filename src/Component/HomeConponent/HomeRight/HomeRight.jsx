import React from "react";
import { Outlet } from "react-router-dom";

const HomeRight = () => {
  return (
    <div className="w-full pl-7">
      <Outlet />
    </div>
  );
};

export default HomeRight;
