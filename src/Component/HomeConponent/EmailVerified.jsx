import React from "react";
import emailicon from "../../assets/EmailVerifiedpage/email.gif";
import { Link } from "react-router-dom";
const EmailVerified = ({ email, displayName }) => {
  return (
    <div className="flex justify-center items-center  h-[100vh] bg-blue-300">
      <div className="flex justify-center flex-col items-center gap-y-5">
        <div>
          <img
            src={emailicon}
            alt={emailicon}
            className="h-auto w-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold font-Nunito text-blue-600">
          {displayName ? displayName : null}
        </h1>
        <h1 className=" text-4xl font-bold font-Nunito ">
          Please verified your {email ? email : "example@gmail.com"}
        </h1>
        <button className="px-14 py-5 bg-green-500 text-white font-semibold rounded-md">
          <Link to={"https://mail.google.com/mail/"} target="_blank">
            Go to Email
          </Link>
        </button>
      </div>
    </div>
  );
};

export default EmailVerified;
