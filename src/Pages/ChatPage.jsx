import React from "react";
import friend1 from "../assets/HomepageImage/Friends/f2.gif";
import Search from "../Component/HomeConponent/HomepageComponent/HomepageCommonComponent/Search.jsx";
import GroupList from "../Component/HomeConponent/HomepageComponent/GroupList/GroupList.jsx";
import Friends from "../Component/HomeConponent/HomepageComponent/Friends/Friends.jsx";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
const ChatPage = () => {
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
                      src={friend1}
                      alt={friend1}
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
                    {"Name Xyz"}
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
            <div className=" mt-10 w-[30%] self-start ">
              <div className=" msgLeft  flex items-center justify-center rounded-xl bg-gray-300 py-10">
                <span>Hi</span>
              </div>
              <span>Today, 2:01pm</span>
            </div>
            <div className=" mt-14 w-[30%] self-end">
              <div className="msgRight flex items-center justify-center bg-blue-300 py-10">
                <span>Hello</span>
              </div>
              <span>Today, 2:01pm</span>
            </div>
            <div className=" mt-10 w-[30%] self-start ">
              <div className=" msgLeft  flex items-center justify-center rounded-xl bg-gray-300 py-10">
                <span>Hi</span>
              </div>
              <span>Today, 2:01pm</span>
            </div>
            <div className=" mt-14 w-[30%] self-end">
              <div className="msgRight flex items-center justify-center bg-blue-300 py-10">
                <span>Hello</span>
              </div>
              <span>Today, 2:01pm</span>
            </div>
            <div className=" mt-10 w-[30%] self-start ">
              <div className=" msgLeft  flex items-center justify-center rounded-xl bg-gray-300 py-10">
                <span>Hi</span>
              </div>
              <span>Today, 2:01pm</span>
            </div>
            <div className=" mt-14 w-[30%] self-end">
              <div className="msgRight flex items-center justify-center bg-blue-300 py-10">
                <span>Hello</span>
              </div>
              <span>Today, 2:01pm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
