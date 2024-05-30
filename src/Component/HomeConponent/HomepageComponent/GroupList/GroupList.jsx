import React, { useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

import profilePicture from "../../../../assets/HomepageImage/one.gif";
import profilePictur2 from "../../../../assets/HomepageImage/two.gif";
import profilePicture3 from "../../../../assets/HomepageImage/one.gif";
import profilePicture4 from "../../../../assets/HomepageImage/two.gif";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
  },
};
const GroupList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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
  /**
   * todo : HandleGroup funtionlaity
   *
   */

  return (
    <div className="w-[34%]">
      <div className="my-5 flex items-center justify-between">
        <h1 className="font-Poppins text-xl font-semibold text-custom-black">
          Groups List
        </h1>

        <button
          onClick={() => setIsOpen(true)}
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form class="mx-auto max-w-sm">
          <div class="mb-5">
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div class="mb-5">
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div class="mb-5 flex items-start">
            <div class="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default GroupList;
