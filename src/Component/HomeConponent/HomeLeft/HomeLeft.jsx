import React, { useEffect, useState } from "react";
import profilePicture from "../../../assets/homeLeft/profile.png";
import home from "../../../assets/homeLeft/home.gif";
import el from "../../../assets/homeLeft/ell.gif";
import bell from "../../../assets/homeLeft/bell.gif";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { Uploader } from "uploader";
import { LuUploadCloud } from "react-icons/lu";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
const HomeLeft = () => {
  const auth = getAuth();
  const location = useLocation();
  const [photUrl, setphotUrl] = useState("");
  const [realtime, setrealtime] = useState(false);
  const uploader = Uploader({
    apiKey: "free",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.photoURL);
        setphotUrl(user.photoURL);
      }
    });
  }, [photUrl, realtime]);

  console.log(photUrl);

  const HanldeUpload = () => {
    uploader
      .open({
        multi: false,
      })
      .then((files) => {
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          updateProfile(auth.currentUser, {
            photoURL: files[0].fileUrl,
          }).then(() => {
            setrealtime(!realtime);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(photUrl);

  let active = location.pathname.split("/")[1];
  return (
    <div className="my-4 ml-4">
      <div className="h-[100vh] rounded-xl bg-gradient-to-r from-[#2b5876] to-[#4e4376] px-10 py-[38px]">
        {photUrl ? (
          <div className="relative  h-[100px] w-[100px] rounded-full ">
            <picture>
              <img
                src={photUrl}
                alt={photUrl}
                className="h-full w-full rounded-full object-cover"
              />
            </picture>
            <span
              className="absolute left-1/3  top-1/3 cursor-pointer text-[30px] text-white"
              onClick={HanldeUpload}
            >
              <LuUploadCloud />
            </span>
          </div>
        ) : (
          <div className="relative ">
            <picture>
              <img src={profilePicture} alt={profilePicture} />
            </picture>
            <span
              className="absolute left-1/3  top-1/3 cursor-pointer text-[30px] text-white"
              onClick={HanldeUpload}
            >
              <LuUploadCloud />
            </span>
          </div>
        )}

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
