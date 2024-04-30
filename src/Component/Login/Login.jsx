import React from "react";
import LoginLeft from "./LoginComponent/LoginLeft";
import LoginRight from "./LoginComponent/LoginRight";

const Login = () => {
  return (
    <div className="flex">
      <LoginLeft />
      <LoginRight />
    </div>
  );
};

export default Login;
