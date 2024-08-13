import React, { useState } from "react";

const ProfilePhoto = ({ onhandleChnageProfilePicture, progresBar }) => {
  const [currentImg, setcurrentImg] = useState("");
  const handleImg = (event) => {
    const { files } = event.target;
    setcurrentImg(files[0]);
  };

  return (
    <div className="mt-10">
      <label htmlFor="avatar" className="font-Nunito text-xl text-black">
        {" "}
        Change Profile Picture{" "}
      </label>
      <input
        type="file"
        name="avatar"
        id="avatar"
        onChange={handleImg}
        className="mt-5 w-full border-2"
      />
      {progresBar ? (
        <div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            class="mt-5 w-full rounded-full bg-green-600 py-2 text-center text-white
      "
            style={{ width: `${Math.ceil(progresBar)}%` }}
          >
            {Math.ceil(progresBar)}%
          </div>
        </div>
      ) : (
        <button
          className="mt-5 w-full rounded-full bg-green-600 py-2 transition-all
      hover:bg-green-400"
          onClick={() => onhandleChnageProfilePicture(currentImg)}
        >
          Update
        </button>
      )}
    </div>
  );
};

export default ProfilePhoto;
