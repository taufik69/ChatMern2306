import React, { useEffect, useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdPhotoAlbum } from "react-icons/md";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import ModalBody from "./Modal.jsx";
import UsernameUpdate from "./UsernameUpdate.jsx";

const SettingsLeftBottom = ({ ongetUserInfo }) => {
  const db = getDatabase();
  const auth = getAuth();
  const [currentUser, setcurrentUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [usernameInput, setusernameInput] = useState(
    auth.currentUser.displayName || "",
  );

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  /**
   * todo : Fetch a user Data from firebase database
   * @param ({})
   */
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().uid)
          setcurrentUser({ ...item.val(), userKey: item.key });
      });
    });
    ongetUserInfo(currentUser);
  }, []);
  /**
   *todo : take a user INput
   *
   */
  const updateUserInfoInput = (e) => {
    setusernameInput(e.target.value);
  };

  const onfoucsHanlde = () => {
    setusernameInput("");
  };

  /**
   * todo: make a update usename funtoin
   * @param ({userId})
   */

  const upadateUserName = async () => {
    try {
      if (!usernameInput) {
        alert("UserName missing");
      } else {
        const currentUserRef = ref(db, `users/${currentUser.userKey}`);
        await update(currentUserRef, {
          username: usernameInput,
        });
      }
    } catch (error) {
      console.warn(error);
    } finally {
      console.log("lskadj");
      closeModal();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-8 px-12">
        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={openModal}
        >
          <span>
            <HiOutlinePencilSquare className="text-3xl" />
          </span>
          <p className="font-Nunito text-xl font-semibold">
            Edit Profile Name.
          </p>
        </div>

        <div className="flex cursor-pointer items-center space-x-2">
          <span>
            <FaRocketchat className="text-3xl" />
          </span>
          <p className="font-Nunito text-xl font-semibold">
            Edit Profile Status Info..
          </p>
        </div>

        <div className="flex cursor-pointer items-center space-x-2">
          <span>
            <MdPhotoAlbum className="text-3xl" />
          </span>
          <p className="font-Nunito text-xl font-semibold">
            Edit Profile Photo.
          </p>
        </div>

        <div className="flex cursor-pointer items-center space-x-2">
          <span>
            <FiHelpCircle className="text-3xl" />
          </span>
          <p className="font-Nunito text-xl font-semibold">Help</p>
        </div>
      </div>
      <ModalBody onOpenModal={modalIsOpen} oncloseModal={closeModal}>
        <UsernameUpdate
          onUpadateUserName={upadateUserName}
          onupdateUserInfoInput={updateUserInfoInput}
          onusernameInput={usernameInput}
          onfoucsHanlde={onfoucsHanlde}
        />
      </ModalBody>
    </>
  );
};

export default SettingsLeftBottom;
