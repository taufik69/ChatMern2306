import React from "react";

import { IoEllipsisVerticalSharp } from "react-icons/io5";
import Search from "../HomepageCommonComponent/Search";
import friend1 from "../../../../assets/HomepageImage/Friends/f1.gif";
import friend2 from "../../../../assets/HomepageImage/Friends/f2.gif";
import friend3 from "../../../../assets/HomepageImage/Friends/f3.gif";
import friend4 from "../../../../assets/HomepageImage/Friends/f4.png";
import friend5 from "../../../../assets/HomepageImage/Friends/f5.png";
const Mygroups = () => {
  const myGroups = [
    {
      id: 1,
      image: friend1,
      title: "Taufik ",
      description: "Hi Guys, Wassup!",
      active: false,
    },

    {
      id: 2,
      image: friend3,
      title: "Tawhid",
      description: "Good to see you.",
      active: true,
    },

    {
      id: 3,
      image: friend2,
      title: "Shovo",
      description: "What plans today?",
      active: false,
    },

    {
      id: 4,
      image: friend4,
      title: "Moni",
      description: "Lets Do Party",
      active: true,
    },
    {
      id: 5,
      image: friend5,
      title: "Thamina",
      description: "Lets Do Party",
      active: false,
    },
  ];
  return (
    <>
      <div className="w-[30%] self-end">
        <div className="my-5 flex items-center justify-between ">
          <h1 className="font-Poppins text-xl font-semibold text-custom-black">
            My Groups
          </h1>
          <span>
            <IoEllipsisVerticalSharp className="text-2xl text-btn-color" />
          </span>
        </div>
        <div className=" h-[347px] w-full  overflow-y-scroll  rounded-xl shadow-xl scrollbar-thin  scrollbar-track-gray-400 scrollbar-thumb-sky-700">
          <div className=" divide-y-[1px] divide-gray-200">
            {myGroups?.map((item) => (
              <div
                className="flex items-center justify-between px-7 py-5"
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                  <picture>
                    <img
                      src={item.image}
                      alt={item.image}
                      className="s-full h-full rounded-full object-cover shadow-lg"
                    />
                  </picture>
                  {item.active && (
                    <span class="absolute bottom-1 right-1 flex h-4 w-4">
                      <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span class="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
                    </span>
                  )}
                </div>

                <div className="flex w-[45%]  flex-col items-start justify-center text-wrap   ">
                  <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                    {item.title ? item.title : "Name Xyz"}
                  </h1>
                  <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                    {item.description ? item.description : "hello xyz"}
                  </p>
                </div>

                <div>
                  <p className="font-Poppins text-lg text-custom-black opacity-50">
                    Today, 8:56pm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mygroups;