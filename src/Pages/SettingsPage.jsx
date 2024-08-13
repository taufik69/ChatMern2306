import React, { useEffect, useState } from "react";
import Search from "../Component/HomeConponent/HomepageComponent/HomepageCommonComponent/Search.jsx";
import { getAuth } from "firebase/auth";
import SettingsLeftBottom from "../Component/settingComponent/SettingsLeftBottom.jsx";
import { getDatabase, ref, onValue, update } from "firebase/database";
import settings from "../assets/settings/setting.gif";
const SettingsPage = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [currentUser, setcurrentUser] = useState({});

  /**
   * todo : Fetch a user Data from firebase database
   * @param ({})
   */
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().uid)
          setcurrentUser({ ...item.val(), userKey: item.key });
      });
    });
  }, []);

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
                src={currentUser.profile_picture}
                alt=""
                className="h-[100px] w-[100px] rounded-full border-2 border-blue-500 shadow-2xl"
              />
            </picture>

            <div className="flex flex-col">
              <h1 className="font-Poppins text-3xl font-bold capitalize text-black">
                {currentUser.username}
              </h1>
              <p className="font-Poppins text-2xl  font-normal lowercase text-black opacity-75">
                {currentUser.email}
              </p>
            </div>
          </div>
          <hr className="my-10" />
          <SettingsLeftBottom />
        </div>
        <div className="h-[90vh] w-1/2 rounded-md  shadow-xl">
          <picture>
            <img src={settings} alt={settings} />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
