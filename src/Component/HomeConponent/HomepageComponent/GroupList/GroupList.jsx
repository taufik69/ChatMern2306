import React, { useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import profilePicture from "../../../../assets/HomepageImage/one.gif";
import profilePictur2 from "../../../../assets/HomepageImage/two.gif";
import profilePicture3 from "../../../../assets/HomepageImage/one.gif";
import profilePicture4 from "../../../../assets/HomepageImage/two.gif";
import Modal from "react-modal";
import { ImCancelCircle } from "react-icons/im";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
  },
};

const GroupList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  /**
   * futntion : HanldeOpenModal
   *  @param: ({})
   */

  const HanldeOpenModal = () => {
    openModal();
  };
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
        <button
          onClick={HanldeOpenModal}
          type="button"
          className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-2.5 text-center text-sm font-medium text-white "
        >
          Create Group
        </button>
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
                <button className="rounded-lg  bg-gradient-to-r from-[#614385] to-[#4a5dab]  px-5 py-1 font-Poppins text-xl font-semibold text-white">
                  {item.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* modal body  */}
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="">
          <button
            onClick={() => closeModal()}
            className="flex h-[34px]  w-[34px] items-center justify-center rounded-full  bg-red-500 text-center text-xl   text-white"
          >
            <ImCancelCircle />
          </button>

          <div>
            <h1 className="flex justify-center py-8 font-Nunito text-3xl font-bold text-black">
              Group Information
            </h1>
            <form action="#">
              <div className="flex flex-col gap-y-3 ">
                <label htmlFor="groupname">
                  GroupName{" "}
                  <span className="align-text-top text-red-500">*</span>
                </label>
                <input
                  className="border-[1px] border-gray-200 p-3"
                  type="text"
                  id="groupname"
                  name="groupname"
                  placeholder="Group Name"
                />
              </div>
              <div className="flex flex-col gap-y-3 ">
                <label htmlFor="groupname">
                  Group TagName
                  <span className="align-text-top text-red-500">*</span>
                </label>
                <input
                  className="border-[1px] border-gray-200 p-3"
                  type="text"
                  id="groupname"
                  name="groupname"
                  placeholder="Group TagName"
                />
              </div>
              <div className="flex flex-col gap-y-3 ">
                <label htmlFor="groupname">
                  GrouPhoto
                  <span className="align-text-top text-red-500">*</span>
                </label>
                <input
                  className="border-[1px] border-gray-200 p-3"
                  type="file"
                  id="groupname"
                  name="groupname"
                  placeholder="Group Name"
                />
              </div>
              <button className="bg-green-400 px-5 py-5">Create Group</button>
            </form>
          </div>
        </div>
      </Modal>

      {/* modal body  */}
    </div>
  );
};

export default GroupList;
