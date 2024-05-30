import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

import friend5 from "../../../../assets/HomepageImage/Friends/f5.png";
import { toast, Slide } from "react-toastify";
import moment from "moment/moment";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const BlockUser = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [BlockList, setBlockList] = useState([]);

  /**
   * todo :  Fetch block listed user
   * @param ({})
   */

  useEffect(() => {
    const friendsDbRef = ref(db, "block/");
    onValue(friendsDbRef, (snapshot) => {
      let BlockListblankArr = [];
      snapshot.forEach((item) => {
        BlockListblankArr.push({ ...item.val(), blockUserkey: item.key });
      });
      setBlockList(() => {
        const filterItem = BlockListblankArr.filter(
          (item) => item.blockbyId === auth.currentUser.uid,
        );
        return filterItem;
      });
    });
  }, []);

  return (
    <>
      <div className="w-[30%] self-end">
        <div className="my-5 flex items-center justify-between ">
          <h1 className="font-Poppins text-xl font-semibold text-custom-black">
            Block List
          </h1>
          <span>
            <IoEllipsisVerticalSharp className="animate-pulse text-2xl text-btn-color" />
          </span>
        </div>
        <div className="h-[347px]  w-full overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
          <div className=" divide-y-[1px] divide-gray-200">
            {BlockList.length > 0 ? (
              BlockList?.map((item) => (
                <div
                  className="flex items-center justify-between px-7 py-5"
                  key={item.id}
                >
                  <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                    {item.whoBlockprofile_picture ? (
                      <picture>
                        <img
                          src={item.whoBlockprofile_picture}
                          alt={item.whoBlockprofile_picture}
                          className="s-full h-full rounded-full object-cover shadow-lg"
                        />
                      </picture>
                    ) : (
                      <picture>
                        <img
                          src={friend5}
                          alt={friend5}
                          className="s-full h-full rounded-full object-cover shadow-lg"
                        />
                      </picture>
                    )}
                  </div>

                  <div className="flex w-[62%]  flex-col items-start justify-center text-wrap   ">
                    <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                      {item.whoBlockName ? item.whoBlockName : "Name Xyz"}
                    </h1>
                    <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                      {moment(item.createdAtDate)
                        ? moment(item.createdAtDate).fromNow()
                        : "Yesterday, 6:22pm"}
                    </p>
                  </div>

                  <div>
                    <button className="rounded-md bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-3 py-2 font-bold text-white">
                      unblock
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
                  <span class="font-medium"></span> No Block user Availavil here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockUser;
