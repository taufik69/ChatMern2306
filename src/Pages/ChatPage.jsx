import React, { useEffect, useState } from "react";
import friend1 from "../assets/HomepageImage/Friends/f2.gif";
import Search from "../Component/HomeConponent/HomepageComponent/HomepageCommonComponent/Search.jsx";
import GroupList from "../Component/HomeConponent/HomepageComponent/GroupList/GroupList.jsx";
import Friends from "../Component/HomeConponent/HomepageComponent/Friends/Friends.jsx";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { FaRegSmileBeam } from "react-icons/fa";
import { FcMultipleCameras } from "react-icons/fc";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment/moment";
const ChatPage = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [msg, setmsg] = useState("");
  const [singlemsg, setsinglemsg] = useState([]);
  const { Users } = useSelector((state) => state.Friends);
  const whoRecivedMsgInfo = {
    whoRecivedMsgName: Users.senderName,
    whoRecivedMsgEmail: Users.senderEmail,
    whoRecivedMsgUid: Users.senderUid,
    whoRecivedMsgPhotoUrl: Users.profile_picture,
  };

  /**
   * todo : handleChatmsg function implement
   * @param({event})
   */
  const handleChatmsg = (event = {}) => {
    const { value } = event.target;
    setmsg(value);
  };
  /**
   * todo handleSendMsg furnciton implementation
   * @param ({})
   */

  const handleSendMsg = () => {
    setmsg("");
    const singleMsgRef = ref(db, "SingleMsg");
    set(push(singleMsgRef), {
      whoSendMsgEmail: auth.currentUser.email,
      whoSendMsgName: auth.currentUser.displayName,
      WhoSendMsgUid: auth.currentUser.uid,
      WhoSendMsgPhotoUrl: auth.currentUser.photoURL,
      whoRecivedMsgName: whoRecivedMsgInfo.whoRecivedMsgName,
      WhoRecivedMsgEmail: whoRecivedMsgInfo.whoRecivedMsgEmail,
      whoRecivedMsgUid: whoRecivedMsgInfo.whoRecivedMsgUid,
      whoRecivedMsgPhotoUrl: whoRecivedMsgInfo.whoRecivedMsgPhotoUrl,
      message: msg,
      createdAtDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    });
  };

  /**
   * todo : singlemsg data retrive
   */
  useEffect(() => {
    const SingleMsgRef = ref(db, "SingleMsg/");
    onValue(SingleMsgRef, (snapshot) => {
      let singlemsgArr = [];
      snapshot.forEach((item) => {
        singlemsgArr.push({
          ...item.val(),
          singleMsgKey: item.key,
        });
      });
      setsinglemsg(singlemsgArr);
    });
  }, []);
  console.log(singlemsg);

  return (
    <div className="p-5">
      <div className="flex">
        <div className="w-[38%]">
          <Search className={"w-full"} />
          <GroupList isChat={true} />
          <Friends isChat={true} />
        </div>
        <div className="mx-10 w-full bg-blue-100">
          <div>
            <div className="mx-7 flex items-center justify-between border-b-2  border-b-gray-400 py-5">
              <div className="flex items-center gap-x-10 ">
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  <picture>
                    <img
                      src={
                        Users.profile_picture ? Users.profile_picture : friend1
                      }
                      alt={
                        Users.profile_picture ? Users.profile_picture : friend1
                      }
                      className="s-full h-full rounded-full object-cover shadow-lg"
                    />
                  </picture>

                  {navigator.onLine && (
                    <span class="absolute bottom-1 right-1 flex h-4 w-4">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                    </span>
                  )}
                </div>

                <div className="flex   flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {Users.senderName ? Users.senderName : "Name Xyz"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    Online
                  </p>
                </div>
              </div>
              <span>
                <IoEllipsisVerticalSharp className="text-2xl text-btn-color" />
              </span>
            </div>
          </div>
          <div className="flex h-[75vh] flex-col overflow-y-scroll px-7 scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
            {singlemsg?.map((item) =>
              (auth.currentUser.uid && item.WhoSendMsgUid) ||
              (item.whoRecivedMsgUid && auth.currentUser.uid) ? (
                <div className=" mt-14 w-[30%] self-end">
                  <div className="msgRight flex items-center justify-center bg-blue-300 py-10">
                    <span>{item.message}</span>
                  </div>
                  <span>{moment(item.createdAtDate).fromNow()}</span>
                </div>
              ) : (
                <div className=" mt-10 w-[30%] self-start ">
                  <div className=" msgLeft  flex items-center justify-center rounded-xl bg-gray-300 py-10">
                    <span>{item.message}</span>
                  </div>
                  <span>{moment(item.createdAtDate).fromNow()}</span>
                </div>
              ),
            )}
          </div>

          <div className="relative m-6 flex items-center gap-x-5">
            <input
              type="text"
              className="w-full rounded-2xl bg-gray-200 py-5 pl-10 shadow-xl"
              placeholder="....."
              onChange={handleChatmsg}
              value={msg}
            />
            <div className="absolute right-[13%] flex items-center gap-x-6 ">
              <span className="cursor-pointer text-3xl">
                <FaRegSmileBeam />
              </span>
              <span className="cursor-pointer text-3xl">
                <FcMultipleCameras />
              </span>
            </div>

            <span
              className="cursor-pointer rounded-lg bg-btn-color px-10 py-3 text-3xl text-white"
              onClick={handleSendMsg}
            >
              <LuSend />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
