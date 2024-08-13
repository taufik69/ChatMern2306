import React, { useEffect, useState } from "react";
import { FaRocketchat } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdPhotoAlbum } from "react-icons/md";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ModalBody from "./Modal.jsx";
import UsernameUpdate from "./UsernameUpdate.jsx";
import ProfilePhoto from "./ProfilePhot.jsx";

const SettingsLeftBottom = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const [currentUser, setcurrentUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updatepp, setupdatepp] = useState("");
  const [usernameInput, setusernameInput] = useState(
    auth.currentUser.displayName || "",
  );
  const [progress, setprogress] = useState(0);

  function openModal(updateProfilePicture) {
    setupdatepp(updateProfilePicture);
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
      closeModal();
    }
  };

  /**
   * todo : update profile picture
   * @param({userId})
   * *function : handleChnageProfilePicture
   */
  console.log(currentUser);

  const handleChnageProfilePicture = (updatedRawImage) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const profilePictureRef = storageRef(
      storage,
      "profilePicture/" + updatedRawImage.name,
    );
    const uploadTask = uploadBytesResumable(profilePictureRef, updatedRawImage);

    // start uploading and downloadin
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progress);
      },
      (error) => {
        console.log(error.code);
      },
      () => {
        closeModal();
        setprogress(0);

        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userRef = ref(db, `users/${currentUser.userKey}`);
          update(userRef, {
            profile_picture: downloadURL,
          });
        });
      },
    );
  };

  return (
    <>
      <div className="flex flex-col gap-y-8 px-12">
        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => openModal("")}
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

        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => openModal("updateProfilePicture")}
        >
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
        {updatepp == "" ? (
          <UsernameUpdate
            onUpadateUserName={upadateUserName}
            onupdateUserInfoInput={updateUserInfoInput}
            onusernameInput={usernameInput}
            onfoucsHanlde={onfoucsHanlde}
          />
        ) : (
          <ProfilePhoto
            onhandleChnageProfilePicture={handleChnageProfilePicture}
            progresBar={progress}
          />
        )}
      </ModalBody>
    </>
  );
};

export default SettingsLeftBottom;
