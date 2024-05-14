import React from "react";
import { IoSearch } from "react-icons/io5";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
const Search = ({ className }) => {
  return (
    <>
      <div className={`relative ${className}`}>
        <input
          className={`${className} rounded-2xl bg-[#E8F0FE]  py-3 pl-14 shadow-xl placeholder:text-xl`}
          type="text"
          placeholder="search"
          name="search"
          id="search"
        />
        <span className="absolute left-[1%] top-[50%] -translate-y-1/2 ">
          <IoSearch className="text-2xl" />
        </span>

        <span className="absolute right-[3%] top-[45%] -translate-y-1/2 ">
          <IoEllipsisVerticalSharp className="text-2xl text-btn-color" />
        </span>
      </div>
    </>
  );
};

export default Search;
