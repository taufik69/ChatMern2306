import React from "react";

const Input = () => {
  return (
    <>
      <div className="my-10">
        <label
          htmlFor="email"
          className="font-semibold  text-[12px] text-dark-blue  opacity-50 font-Nunito"
        >
          Email Address
        </label>
        <input
          type="text"
          placeholder="Ladushing691@gmail.com"
          id="email"
          name="email"
          autoComplete="off"
          className="w-full py-[22px] rounded-lg px-4 border-2 border-blue-200 font-Nunito"
        />
      </div>
    </>
  );
};

export default Input;
