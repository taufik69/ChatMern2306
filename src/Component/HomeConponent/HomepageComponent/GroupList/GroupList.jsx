import React from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

import profilePicture from "../../../../assets/HomepageImage/one.gif";
import profilePictur2 from "../../../../assets/HomepageImage/two.gif";
import profilePicture3 from "../../../../assets/HomepageImage/one.gif";
import profilePicture4 from "../../../../assets/HomepageImage/two.gif";
const GroupList = () => {
  const users = [
    {
      id: 1,
      image: profilePicture,
      title: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "Join",
    },

    {
      id: 2,
      image: profilePictur2,
      title: "Friends Forever",
      description: "Good to see you.",
      button: "Join",
    },

    {
      id: 3,
      image: profilePicture3,
      title: "Crazy Cousins",
      description: "What plans today?",
      button: "Join",
    },

    {
      id: 4,
      image: profilePicture4,
      title: "Bechelor Hub",
      description: "Lets Do Party",
      button: "join",
    },
  ];
  return (
    <div className="w-[34%]">
      <div className="my-5 flex items-center justify-between">
        <h1 className="font-Poppins text-xl font-semibold text-custom-black">
          Groups List
        </h1>
        <span>
          <IoEllipsisVerticalSharp className="text-2xl text-btn-color" />
        </span>
      </div>
      <div className="mt-10 h-[347px]  w-full overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
        <div className=" divide-y-[1px] divide-gray-200">
          {users?.map((item) => (
            <div className="flex items-center justify-between px-7 py-5">
              <div className="h-[70px] w-[70px] cursor-pointer">
                <picture>
                  <img
                    src={item.image}
                    alt=""
                    className="s-full h-full rounded-full object-cover shadow-lg"
                  />
                </picture>
              </div>

              <div className="flex w-[60%] flex-col items-center justify-center text-wrap   ">
                <h1 className="font-Poppins text-lg font-semibold text-custom-black">
                  {item.title}
                </h1>
                <p className="font-Poppins text-[14px] font-medium text-[#4D4D4D] opacity-75">
                  {item.description}
                </p>
              </div>

              <div>
                <button className="rounded-lg  bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-1 font-Poppins text-xl font-semibold text-white">
                  {item.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
