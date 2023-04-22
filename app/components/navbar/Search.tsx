"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div
      className="
        py-2
        w-full
        md:w-auto
        shadow-sm
        transition
        border-[1px]
        rounded-full
        cursor-pointer
        hover:shadow-md
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          justify-between
        "
      >
        <div
          className="
            px-6
            text-sm
            font-semibold
          "
        >
          Anywere
        </div>
        <div
          className="
            px-6
            hidden
            flex-1
            text-sm
            sm:block
            text-center
            border-x-[1px]
            font-semibold
          "
        >
          Any Week
        </div>
        <div
          className="
            flex
            pl-6
            pr-2
            gap-3
            text-sm
            flex-row
            items-center
            text-gray-600
          "
        >
          <div className="hidden sm:block">Add Guests</div>
          <div
            className="
              p-2
              text-white
              bg-rose-500
              rounded-full
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
