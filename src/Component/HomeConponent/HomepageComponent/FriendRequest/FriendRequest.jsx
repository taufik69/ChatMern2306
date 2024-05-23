import { IoEllipsisVerticalSharp } from "react-icons/io5";
import friend3 from "../../../../assets/HomepageImage/Friends/f3.gif";

import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";
const FriendRequest = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [friendRequestList, setfriendRequestList] = useState([]);

  /**
   * todo : Fetch Data from friend request db
   */
  useEffect(() => {
    const FriendRequestDbRef = ref(db, "FriendRequest/");
    onValue(FriendRequestDbRef, (snapshot) => {
      let friendRequestArr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverUid === auth.currentUser.uid) {
          friendRequestArr.push({
            ...item.val(),
            friendRequestUserKey: item.key,
          });
        }
      });
      setfriendRequestList(friendRequestArr);
    });
  }, []);
  console.log(friendRequestList);
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
            {friendRequestList?.map((item) => (
              <div
                className="flex items-center justify-between px-7 py-5"
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  {item.profile_picture != "" ? (
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
                        src={friend3}
                        alt={friend3}
                        className="s-full h-full rounded-full object-cover shadow-lg"
                      />
                    </picture>
                  )}
                </div>

                <div className="flex w-[54%]  flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.senderName ? item.senderName : "Name Xyz"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    {moment(item.createdAtDate).calendar()}
                  </p>
                </div>

                <div>
                  <button className="rounded-md bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-3 py-2 font-bold text-white transition-all hover:bg-gradient-to-l hover:from-[#134E5E] hover:to-[#71B280]">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
