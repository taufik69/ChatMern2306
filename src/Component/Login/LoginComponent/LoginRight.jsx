import React from "react";
import LoginImg from "../../../assets/Login.jpg";
const LoginRight = () => {
  return (
    <div>
      <picture>
        <img src={LoginImg} alt={LoginImg} className="w-full h-auto" />
      </picture>
    </div>
  );
};

export default LoginRight;
