import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import friend1 from "../../../../assets/HomepageImage/Friends/f1.gif";
import friend2 from "../../../../assets/HomepageImage/Friends/f2.gif";
import friend3 from "../../../../assets/HomepageImage/Friends/f3.gif";
import friend4 from "../../../../assets/HomepageImage/Friends/f4.png";
import friend5 from "../../../../assets/HomepageImage/Friends/f5.png";

const UserList = () => {
  const user = [
    {
      id: 1,
      image: friend1,
      title: "Raghav ",
      timeZone: "Today, 8:56pm",
    },

    {
      id: 2,
      image: friend3,
      title: "Marvin McKinney ",
      timeZone: "Yesterday, 8:56pm",
    },

    {
      id: 3,
      image: friend2,
      title: "Tejeshwini C ",
      timeZone: "Today, 12:22pm",
    },

    {
      id: 4,
      image: friend4,
      title: "Kiran ",
      timeZone: "Yesterday, 8:56pm",
    },
    {
      id: 5,
      image: friend5,
      title: "Swathi ",
      timeZone: "Today, 2:31pm",
    },
  ];
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
          {user?.map((item) => (
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
              </div>

              <div className="flex w-[62%]  flex-col items-start justify-center text-wrap   ">
                <h1 className="font-Poppins text-xl font-semibold text-custom-black">
                  {item.title ? item.title : "Name Xyz"}
                </h1>
                <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                  {item.timeZone ? item.timeZone : "Yesterday, 6:22pm"}
                </p>
              </div>

              <div>
                <button className="rounded-md bg-gradient-to-r from-[#614385] to-[#1D2B64] px-3 py-2 font-bold text-white">
                  <FaPlus className="animate-pulse" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
