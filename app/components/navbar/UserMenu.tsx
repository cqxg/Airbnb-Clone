"use client";

import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="
            py-3
            px-4
            hidden
            text-sm
            md:block
            transition
            pounded-full
            font-semibold
            cursor-pointer
            hover:bg-bg-neutral-100
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            flex
            py-4
            gap-3
            md:py-1
            md:px-2
            flex-row
            transition
            border-[1px]
            items-center
            cursor-pointer
            hover:shadow-md
           border-neutral-200
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            top-12
            text-sm
            right-0
            w-[40vw]
            md:w-3/4
            absolute
            shadow-md
            rounded-xl
            bg-white
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
