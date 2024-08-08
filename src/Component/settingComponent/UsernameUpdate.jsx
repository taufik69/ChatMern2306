import React from "react";

const UsernameUpdate = ({
  onUpadateUserName,
  onupdateUserInfoInput,
  onusernameInput,
  onfoucsHanlde,
}) => {
  return (
    <div>
      <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
        <label
          htmlFor="userName"
          className="mt-3 inline-block font-sansSerif text-xl font-normal"
        >
          Fill Your UserName <span className=" text-red-600"> *</span>
          <input
            type="text"
            name="username"
            id="usename"
            onChange={onupdateUserInfoInput}
            value={onusernameInput}
            onFocus={onfoucsHanlde}
            className="mb-5 mt-5 w-full rounded-md bg-gray-600 px-4 py-2 text-white"
          />
          <input
            type="submit"
            className="m-auto  inline-block w-1/2 cursor-pointer rounded-md bg-green-400 py-2"
            onClick={onUpadateUserName}
          />
        </label>
      </form>
    </div>
  );
};

export default UsernameUpdate;
