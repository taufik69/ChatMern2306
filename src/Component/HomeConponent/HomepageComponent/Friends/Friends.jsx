import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Search from "../HomepageCommonComponent/Search";
import friend1 from "../../../../assets/HomepageImage/Friends/f1.gif";
import friend2 from "../../../../assets/HomepageImage/Friends/f2.gif";
import friend3 from "../../../../assets/HomepageImage/Friends/f3.gif";
import friend4 from "../../../../assets/HomepageImage/Friends/f4.png";
import friend5 from "../../../../assets/HomepageImage/Friends/f5.png";
import { getDatabase, ref, onValue , set , push } from "firebase/database";
import moment from "moment/moment";
import { getAuth } from "firebase/auth";
const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [ActivefriendList ,setActivefriendList ] = useState([])

  /**
   * todo : fetch all friend in friends database
   * 
   */

  useEffect(()=> {
    const friendsDbRef =  ref(db, "Friends/");
    onValue(friendsDbRef , (snapshot)=> {
      let friendBlankArr = [];
      snapshot.forEach((item)=> {
        if(auth.currentUser.uid === item.val().reciverUid && auth.currentUser.email === item.val().reciverEmail) {

          friendBlankArr.push({...item.val(), FriendUserKey: item.key})
        }
      })
      setActivefriendList(friendBlankArr)
    })
  }, [db])
  
  return (
    <>
      <div className="w-[30%] self-end">
        <div className="my-5 flex items-center justify-between ">
          <h1 className="font-Poppins text-xl font-semibold text-custom-black">
            {ActivefriendList.length > 0 ? `Freinds ${ActivefriendList.length}` : "You have No Friends"}
          </h1>
          <span>
            <IoEllipsisVerticalSharp className="text-2xl text-btn-color" />
          </span>
        </div>
        <div className=" h-[347px] w-full  overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
          <div className=" divide-y-[1px] divide-gray-200">
            {ActivefriendList.length > 0  ? (ActivefriendList?.map((item) => (
              <div
                className="flex items-center justify-between px-7 py-5"
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  {item.profile_picture? (<picture>
                    <img
                      src={item.profile_picture}
                      alt={item.profile_picture}
                      className="s-full h-full rounded-full object-cover shadow-lg"
                    />
                  </picture>) : (<picture>
                    <img
                      src={friend2}
                      alt={friend2}
                      className="s-full h-full rounded-full object-cover shadow-lg animate-bounce"
                    />
                  </picture>)}
                  
                  {navigator.onLine && (
                    <span class="absolute bottom-1 right-1 flex h-4 w-4">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                    </span>
                  )}
                </div>

                <div className="flex w-[45%]  flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.senderName ? item.senderName : "Taufik islaam"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    {item.description ? item.description : "Hello guys"}
                  </p>
                </div>

                <div>
                  <p className="font-Poppins text-lg text-custom-black opacity-50">
                    Today, 8:56pm
                  </p>
                </div>
              </div>
            ))) :(<div className="flex h-[38vh] items-center justify-center">
            <div
              class="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span class="font-medium">Info alert!</span> No Friend
              Availavil here
            </div>
          </div>)}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
