import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import home from "../../../assets/homeLeft/home.gif";
import el from "../../../assets/homeLeft/ell.gif";
import bell from "../../../assets/homeLeft/bell.gif";
import profilePic from "../../../assets/homeLeft/profilePic.gif";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { Uploader } from "uploader";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, update } from "firebase/database";

const HomeLeft = () => {
  const auth = getAuth();
  const db = getDatabase();
  const location = useLocation();
  const [userInfo, setuserInfo] = useState({});
  let active = location.pathname.split("/")[1];
  const uploader = Uploader({
    apiKey: "free",
  });

  // Get a users information using AuthProver

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        const userDbRef = ref(db, "users/");
        onValue(userDbRef, (snapshot) => {
          snapshot.forEach((item) => {
            if (item.val().uid === uid) {
              setuserInfo(Object.assign(item.val(), { userKey: item.key }));
            }
          });
        });
      }
    });
  }, [db, auth]);

  console.log(userInfo);

  // HanldeProfileUpload funciton implementaiton
  const HanldeProfileUpload = () => {
    uploader
      .open({
        multi: false,
        mimeTypes: ["image/*"],
        editor: {
          images: {
            crop: true,
            cropShape: "circ", // "rect" also supported.
            cropRatio: 1 / 1, // "1" is enforced for "circ".
          },
        },
      })
      .then((files) => {
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          const userDbRef = ref(db, `users/${userInfo.userKey}`);
          update(userDbRef, {
            profile_picture: files[0].fileUrl,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log(userInfo.profile_picture);
  return (
    <div className="my-4 ml-4">
      <div className=" h-[100vh] rounded-xl bg-gradient-to-r from-[#2b5876] to-[#4e4376] px-10 py-[38px]">
        {userInfo.profile_picture ? (
          <div
            className="h-[100px] w-[100px] cursor-pointer rounded-full bg-white shadow-md "
            onClick={HanldeProfileUpload}
          >
            <div className="relative flex h-full items-center justify-center rounded-full after:absolute after:left-0 after:top-0 after:h-[100px] after:w-[100px] after:rounded-full after:border-2  after:bg-[#0c080835] after:content-['']">
              <picture>
                <img
                  src={userInfo.profile_picture}
                  alt={userInfo.profile_picture}
                  className="h-full w-full rounded-full object-cover"
                />
              </picture>
              <span className="absolute z-10">
                <FiUploadCloud className=" text-[30px] text-white" />
              </span>
            </div>
          </div>
        ) : (
          <div
            className="h-[100px] w-[100px] cursor-pointer rounded-full bg-white shadow-md "
            onClick={HanldeProfileUpload}
          >
            <div className="relative flex h-full items-center justify-center rounded-full after:absolute after:left-0 after:top-0 after:h-[100px] after:w-[100px] after:rounded-full after:border-2  after:bg-[#0c080835] after:content-['']">
              <picture>
                <img
                  src={profilePic}
                  alt={profilePic}
                  className="h-full w-full rounded-full object-cover"
                />
              </picture>
              <span className="absolute z-10">
                <FiUploadCloud className=" text-[30px] text-white" />
              </span>
            </div>
          </div>
        )}

        <div className="mt-5">
          <ul className="flex flex-col items-center justify-center gap-y-10">
            <h1 className="text-2xl font-bold text-white">
              {userInfo.username &&
                userInfo.username.slice(0, 1).toUpperCase() +
                  userInfo.username.slice(1, 6)}
              ..
            </h1>

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
