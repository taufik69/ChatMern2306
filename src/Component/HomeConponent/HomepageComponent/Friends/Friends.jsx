import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import friend1 from "../../../../assets/HomepageImage/Friends/f1.gif";
import { FaUsers } from "react-icons/fa";
import { toast, Slide } from "react-toastify";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment/moment";
import { getAuth } from "firebase/auth";
const Friends = ({ isChat = false }) => {
  const db = getDatabase();
  const auth = getAuth();
  const [friends, setfriends] = useState([]);
  /**
   * todo : fetch all friend in friends database
   *
   */
  useEffect(() => {
    const CurrentUid = auth.currentUser.uid;
    const friendsDbRef = ref(db, "Friends/");
    onValue(friendsDbRef, (snapshot) => {
      let frdblankArr = [];
      snapshot.forEach((item) => {
        frdblankArr.push({
          ...item.val(),
          friendKey: item.key,
        });
      });
      setfriends(() => {
        return frdblankArr.filter((item) => item.reciverUid === CurrentUid);
      });
    });
  }, [auth.currentUser.uid, db]);

  /**
   * todo : HandleBlock functionality
   * @params ({items})
   */
  const HandleBlock = (item) => {
    console.log(item);
    set(push(ref(db, "block/")), {
      blockbyId: auth.currentUser.uid,
      blockbyName: auth.currentUser.displayName,
      blockByEmail: auth.currentUser.email,
      blockbyProfile_picture: auth.currentUser.photoURL,
      whoBlock: item.senderUid,
      whoBlockName: item.senderName,
      whoBlockEmail: item.senderEmail,
      whoBlockprofile_picture: item.profile_picture,
      createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    }).then(() => {
      remove(ref(db, "Friends/" + item.friendKey));
      toast.error(`${item.senderName} Blocked`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    });
  };

  return (
    <>
      <div className={`${isChat ? "w-full self-end" : "w-[30%] self-end"}`}>
        <div className="my-5 flex items-center justify-between ">
          <h1 className="font-Poppins text-xl font-semibold text-custom-black">
            <button
              type="button"
              className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
            >
              <FaUsers className="mr-2 text-2xl" /> Friends
              <div className="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
                {friends.length > 0 ? friends.length : 0}
              </div>
            </button>
          </h1>
          <span>
            <IoEllipsisVerticalSharp className="text-2xl text-btn-color" />
          </span>
        </div>
        <div className=" h-[347px] w-full  overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
          <div className=" divide-y-[1px] divide-gray-200">
            {friends.length > 0 ? (
              friends?.map((item) => (
                <div
                  className="flex items-center justify-between px-7 py-5"
                  key={item.id}
                >
                  <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                    {item.profile_picture ? (
                      <picture>
                        <img
                          src={item.profile_picture}
                          alt={item.profile_picture}
                          className="s-full h-full rounded-full object-cover shadow-lg"
                        />
                      </picture>
                    ) : (
                      <picture>
                        <img
                          src={friend1}
                          alt={friend1}
                          className="s-full h-full rounded-full object-cover shadow-lg"
                        />
                      </picture>
                    )}

                    {navigator.onLine && (
                      <span class="absolute bottom-1 right-1 flex h-4 w-4">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                      </span>
                    )}
                  </div>

                  <div className="flex w-[45%]  flex-col items-start justify-center text-wrap   ">
                    <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                      {item.senderName ? item.senderName : "Name Xyz"}
                    </h1>
                    <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                      {item.reciverName
                        ? item.reciverName + " Message You"
                        : "hello xyz"}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-y-2">
                    <p className="font-Poppins text-lg text-custom-black opacity-50">
                      {moment(item.createdAtDate).fromNow()}
                    </p>
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
                      onClick={() => HandleBlock(item)}
                    >
                      Block
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[38vh] items-center justify-center">
                <div
                  class="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <span class="font-medium"></span> No Friend Availavil here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
