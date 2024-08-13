import React from "react";
import LoginImg from "../../../assets/Login.jpg";
const LoginRight = () => {
  return (
    <>
      <picture>
        <img src={LoginImg} alt={LoginImg} className="h-screen w-full" />
      </picture>
    </>
  );
};

export default LoginRight;
