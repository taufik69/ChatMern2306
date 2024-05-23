import React, { useEffect } from "react";
import emailicon from "../../assets/EmailVerifiedpage/email.gif";
import { Link } from "react-router-dom";

const EmailVerified = ({ email, displayName }) => {
  return (
    <div className="flex h-[100vh] items-center  justify-center bg-blue-300">
      <div className="flex flex-col items-center justify-center gap-y-5">
        <div>
          <img
            src={emailicon}
            alt={emailicon}
            className="h-auto w-full object-cover"
          />
        </div>
        <h1 className="font-Nunito text-4xl font-bold text-blue-600">
          {displayName ? displayName : null}
        </h1>
        <h1 className=" font-Nunito text-4xl font-bold ">
          Please verified your {email ? email : "example@gmail.com"}
        </h1>
        <button className="rounded-md bg-green-500 px-14 py-5 font-semibold text-white">
          <Link to={"https://mail.google.com/mail/"} target="_blank">
            Go to Email
          </Link>
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
