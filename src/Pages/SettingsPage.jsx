import React, { useState } from "react";
import Search from "../Component/HomeConponent/HomepageComponent/HomepageCommonComponent/Search.jsx";
import { getAuth } from "firebase/auth";
import SettingsLeftBottom from "../Component/settingComponent/SettingsLeftBottom.jsx";
const SettingsPage = () => {
  const auth = getAuth();
  const [userInfo, setuserInfo] = useState({});
  const getUserInfo = (userInfo) => {
    setuserInfo(userInfo);
  };
  console.log(userInfo);

  return (
    <div className="px-10 py-6">
      <Search className={"w-full"} />

      <div className="mt-10 flex gap-x-10">
        <div className="h-[90vh] w-1/2 rounded-md  shadow-xl">
          <h1 className="p-6 font-Poppins text-2xl font-semibold text-black">
            Profile Settings
          </h1>
          <div className="flex  items-center space-x-8 px-5">
            <picture>
              <img
                src={
                  userInfo
                    ? userInfo.profile_picture
                    : auth.currentUser.photoURL
                }
                alt=""
                className="h-[100px] w-[100px] rounded-full border-2 border-blue-500 shadow-2xl"
              />
            </picture>

            <div className="flex flex-col">
              <h1 className="font-Poppins text-3xl font-bold capitalize text-black">
                {userInfo ? userInfo.username : auth.currentUser.displayName}
              </h1>
              <p className="font-Poppins text-2xl  font-normal lowercase text-black opacity-75">
                {userInfo ? userInfo.email : auth.currentUser.email}
              </p>
            </div>
          </div>
          <hr className="my-10" />
          <SettingsLeftBottom ongetUserInfo={getUserInfo} />
        </div>
        <div className="h-[90vh] w-1/2 rounded-md bg-blue-300 shadow-xl"></div>
      </div>
    </div>
  );
};

export default SettingsPage;
