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
      <div className=" bg-btn-color px-10   h-[90vh]  py-[38px]">
        <picture>
          <img src={profilePicture} alt={profilePicture} />
        </picture>
        <div className="mt-16 ">
          <ul className="flex flex-col justify-center items-center gap-y-10">
            <li
              className={
                active === "home"
                  ? " custom-border cursor-pointer bg-white w-[160%] ml-5 flex items-center justify-center py-4  rounded-l-lg  "
                  : "cursor-pointer"
              }
            >
              <img
                src={home}
                alt={home}
                className="w-[50px] h-[50px] text-[#BAD1FF] flex justify-center items-center"
              />
            </li>

            <li className="cursor-pointer">
              <img
                src={el}
                alt={el}
                className="w-[50px] h-[50px] text-[#BAD1FF]"
              />
            </li>

            <li className="cursor-pointer">
              <img
                src={bell}
                alt={bell}
                className="w-[50px] h-[50px] text-[#BAD1FF]"
              />
            </li>

            <li className="cursor-pointer">
              <IoSettingsOutline className="animate-spin w-[50px] h-[50px] text-[#BAD1FF]" />
            </li>

            <li className="mt-16 cursor-pointer">
              <CiLogout className="animate-pulse w-[50px] h-[50px] text-[#BAD1FF] font-black" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeLeft;
