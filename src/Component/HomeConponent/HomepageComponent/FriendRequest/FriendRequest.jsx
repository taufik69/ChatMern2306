import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import pp from "../../../../assets/HomepageImage/two.gif";
import { useEffect, useState } from "react";

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

const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [FreiendRquestList, setFreiendRquestList] = useState([]);
  /**
   * todo: Fetch friendRequest data from relatime database
   * @param({})
   */

  useEffect(() => {
    const FriendRequestDbRef = ref(db, "FriendRequest/");
    onValue(FriendRequestDbRef, (snapshot) => {
      let friendRequestBlankArr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverUid === auth.currentUser.uid) {
          friendRequestBlankArr.push({
            ...item.val(),
            createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
            friendReqUserKey: item.key,
          });
        }
      });
      setFreiendRquestList(friendRequestBlankArr);
    });
  }, [db]);

  // 
  const handleAcceptRequest = (item) => {
    console.log(item.friendReqUserKey);
    set(push(ref(db, 'Friends/')), {
     ...item
    }).then(()=> {
      // remove(db,`FriendRequest/${item.friendReqUserKey}`)
    })
  }

    return (
    <>
      <div className="w-[34%] self-end">
        <div className="my-5 flex items-center justify-between ">
          <h1 className="font-Poppins text-xl font-semibold text-custom-black">
            Friend Request
          </h1>
          <span>
            <IoEllipsisVerticalSharp className="animate-pulse text-2xl text-btn-color" />
          </span>
        </div>
        <div className="h-[347px]  w-full overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
          <div className=" divide-y-[1px] divide-gray-200">
            {FreiendRquestList.length > 0 ? (
              FreiendRquestList?.map((item) => (
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
                          src={pp}
                          alt={pp}
                          className="s-full h-full rounded-full object-cover shadow-lg"
                        />
                      </picture>
                    )}
                  </div>

                  <div className="flex w-[38%] flex-col  items-start justify-center text-wrap  ">
                    <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                      {item.senderName ? item.senderName : "Name Xyz"}
                    </h1>
                    <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                      {moment(item.createdAtDate).fromNow()}
                    </p>
                  </div>

                  <div className="flex items-center gap-x-4">
                  <button className="rounded-md bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-3 py-2 font-bold text-white transition-all   hover:bg-gradient-to-l hover:from-[#134E5E] hover:to-[#71B280]"  onClick={() => handleAcceptRequest(item)}>
                      Accept
                    </button>
                    
                    <button className="rounded-md bg-gradient-to-r from-[#ff6767] to-[#f80778]  px-3 py-2 font-bold text-white transition-all hover:bg-gradient-to-l hover:from-[#f96363] hover:to-[#d43394]">
                      Cancel
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
                  <span class="font-medium">Info alert!</span> No Friend
                  Availavil here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
