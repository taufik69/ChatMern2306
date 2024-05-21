import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import friend from "../../../../assets/HomepageImage/Friends/f1.gif";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import moment from "moment";
import { getAuth } from "firebase/auth";
const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  // All state
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const UserDbRef = ref(db, "users/");
    onValue(UserDbRef, (snapshot) => {
      let userArray = [];
      snapshot.forEach((item) => {
        // userArray.push(Object.assign(item.val(), { userKey: item.key }));
        if (item.val().uid !== auth.currentUser.uid) {
          userArray.push({ ...item.val(), userKey: item.key });
        }
      });
      setUserList(userArray);
    });
  }, []);

  /**
   *  todo: handleFriendRequest funciton implemention
   *  @params ({})
   *
   * */

  const handleFriendRequest = (item) => {
    set(ref(db, "FriendRequest/"), {
      senderId: auth.currentUser.uid,
      senderEmail: auth.currentUser.email,
      senderName: auth.currentUser.displayName,
      reciverUid: item.uid,
      reciverName: item.username,
      reciverEmail: item.email,
      reciverUserKey: item.userKey,
    });
  };

  return (
    <div className="w-[30%] self-end">
      <div className="my-5 flex items-center justify-between ">
        <h1 className="font-Poppins text-xl font-semibold text-custom-black">
          User List
        </h1>
        <span>
          <IoEllipsisVerticalSharp className="animate-pulse text-2xl text-btn-color" />
        </span>
      </div>
      <div className="h-[347px]  w-full overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
        <div className=" divide-y-[1px] divide-gray-200">
          {userList.length > 0 ? (
            userList?.map((item) => (
              <div
                className="flex items-center justify-between px-7 py-5"
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  <picture>
                    <img
                      src={item.profile_picture ? item.profile_picture : friend}
                      alt={item.profile_picture}
                      className="s-full h-full rounded-full object-cover shadow-lg"
                    />
                  </picture>
                </div>

                <div className="flex w-[62%]  flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.username ? item.username : "Name Xyz"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    {moment(item.createdAtDate, "MMM DD YY").fromNow()}
                  </p>
                </div>

                <div onClick={() => handleFriendRequest(item)}>
                  <button className="rounded-md bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-3 py-2 font-bold text-white">
                    <FaPlus className="animate-pulse" />
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
                <span class="font-medium">Info alert!</span> Change a few things
                up and try submitting again.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
