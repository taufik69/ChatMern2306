import React from "react";
import profilePicture from "../../../assets/homeLeft/profile.png";
import home from "../../../assets/homeLeft/home.gif";
import el from "../../../assets/homeLeft/ell.gif";
import bell from "../../../assets/homeLeft/bell.gif";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
const HomeLeft = ({ active }) => {
  console.log(active);
  return (
    <div>
      <div className=" h-[90vh] bg-btn-color   px-10  py-[38px]">
        <picture>
          <img src={profilePicture} alt={profilePicture} />
        </picture>
        <div className="mt-16 ">
          <ul className="flex flex-col items-center justify-center gap-y-10">
            <li
              className={
                active === "home"
                  ? "custom-border ml-5 flex w-[160%] cursor-pointer items-center justify-center rounded-l-lg bg-white  py-4  "
                  : "cursor-pointer"
              }
            >
              <img
                src={home}
                alt={home}
                className="flex h-[50px] w-[50px] items-center justify-center text-[#BAD1FF]"
              />
            </li>

            <li className="cursor-pointer">
              <img
                src={el}
                alt={el}
                className="h-[50px] w-[50px] text-[#BAD1FF]"
              />
            </li>

            <li className="cursor-pointer">
              <img
                src={bell}
                alt={bell}
                className="h-[50px] w-[50px] text-[#BAD1FF]"
              />
            </li>

            <li className="cursor-pointer">
              <IoSettingsOutline className="h-[50px] w-[50px] animate-spin text-[#BAD1FF]" />
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
