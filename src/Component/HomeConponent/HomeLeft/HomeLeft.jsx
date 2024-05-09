import React from "react";
import profilePicture from "../../../assets/homeLeft/profile.png";
import home from "../../../assets/homeLeft/home.gif";
import el from "../../../assets/homeLeft/ell.gif";
import bell from "../../../assets/homeLeft/bell.gif";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

const HomeLeft = () => {
  const location = useLocation();
  let active = location.pathname.split("/")[1];
  return (
    <div>
      <div className=" h-[98vh] bg-btn-color   px-10  py-[38px]">
        <picture>
          <img src={profilePicture} alt={profilePicture} />
        </picture>
        <div className="mt-16 ">
          <ul className="flex flex-col items-center justify-center gap-y-10">
            <li
              className={
                active === ""
                  ? " relative ml-5 flex w-[160%] cursor-pointer items-center justify-center rounded-l-lg  bg-white  py-4 after:absolute after:right-0 after:top-0 after:h-full after:w-3 after:rounded-l-lg after:bg-btn-color"
                  : "cursor-pointer"
              }
            >
              <Link to={"/"}>
                <img
                  src={home}
                  alt={home}
                  className="flex h-[50px] w-[50px] items-center justify-center text-[#BAD1FF]"
                />
              </Link>
            </li>

            <li
              className={
                active === "chat"
                  ? " relative ml-5 flex w-[160%] cursor-pointer items-center justify-center rounded-l-lg  bg-white  py-4 after:absolute after:right-0 after:top-0 after:h-full after:w-3 after:rounded-l-lg after:bg-btn-color"
                  : "cursor-pointer "
              }
            >
              <Link to={"/chat"}>
                <img
                  src={el}
                  alt={el}
                  className="h-[50px] w-[50px] text-[#BAD1FF]"
                />
              </Link>
            </li>

            <li
              className={
                active === "notification"
                  ? " relative ml-5 flex w-[160%] cursor-pointer items-center justify-center rounded-l-lg  bg-white  py-4 after:absolute after:right-0 after:top-0 after:h-full after:w-3 after:rounded-l-lg after:bg-btn-color"
                  : "cursor-pointer"
              }
            >
              <Link to={"/notification"}>
                <img
                  src={bell}
                  alt={bell}
                  className="h-[50px] w-[50px] text-[#BAD1FF]"
                />
              </Link>
            </li>

            <li
              className={
                active === "settings"
                  ? " relative ml-5 flex w-[160%] cursor-pointer items-center justify-center rounded-l-lg  bg-white  py-4 after:absolute after:right-0 after:top-0 after:h-full after:w-3 after:rounded-l-lg after:bg-btn-color"
                  : "cursor-pointer"
              }
            >
              <Link to={"/settings"}>
                <IoSettingsOutline className="h-[50px] w-[50px] animate-spin text-[#BAD1FF]" />
              </Link>
            </li>

            <li className="mt-16 cursor-pointer">
              <CiLogout className="h-[50px] w-[50px] animate-pulse font-black text-[#BAD1FF]" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;
