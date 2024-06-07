import React, { useEffect, useState } from "react";

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { IoEllipsisVerticalCircleSharp } from "react-icons/io5";

import friend3 from "../../../../assets/HomepageImage/Friends/f3.gif";

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { FaUser } from "react-icons/fa";
const Mygroups = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [GroupList, setGroupList] = useState([]);

  /**
   * todo : fetch all friend in friends database
   *
   */

  useEffect(() => {
    const friendsDbRef = ref(db, "GroupList/");
    onValue(friendsDbRef, (snapshot) => {
      let GroupblankArr = [];
      snapshot.forEach((item) => {
        if (item.val().AdminId === auth.currentUser.uid) {
          GroupblankArr.push({
            ...item.val(),
            GroupKey: item.key,
          });
        }
      });
      setGroupList(GroupblankArr);
    });
  }, [auth.currentUser.uid, db]);
  console.log(productId);
  return (
    <>
      <div className="w-[30%] self-end">
        <div className="my-5 flex items-center justify-between ">
          <h1 className="font-Poppins text-xl font-semibold text-custom-black">
            <button
              type="button"
              className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
            >
              <FaUser className="mr-2 text-2xl" /> Groups
              <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
                {GroupList.length > 0 ? GroupList.length : 0}
              </div>
            </button>
          </h1>
          <span>
            <IoEllipsisVerticalCircleSharp className="text-2xl text-btn-color" />
          </span>
        </div>
        <div className=" h-[347px] w-full  overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
          <div className="divide-y-[1px] divide-gray-200">
            {GroupList?.map((item) => (
              <div
                className="flex items-center justify-between px-7 py-5"
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  {item.GroupPhotUrl ? (
                    <picture>
                      <img
                        src={item.GroupPhotUrl}
                        alt={item.GroupPhotUrl}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  ) : (
                    <picture>
                      <img
                        src={friend3}
                        alt={friend3}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  )}
                  {item.active && (
                    <span class="absolute bottom-1 right-1 flex h-4 w-4">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                    </span>
                  )}
                </div>

                <div className="flex w-[45%]  flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.GroupName ? item.GroupName : "Name Xyz"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    {item.GroupTagName ? item.GroupTagName : "hello xyz"}
                  </p>
                </div>

                <div>
                  <p className="font-Poppins text-lg text-custom-black opacity-50">
                    {moment(item.createdAtDate)
                      ? moment(item.createdAtDate).fromNow()
                      : "Today, 8:56pm"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {GroupList.length === 0 && (
            <div className="flex h-[38vh] items-center justify-center">
              <div
                class="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <span class="font-medium"></span> No Group Availavil here
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Mygroups;
