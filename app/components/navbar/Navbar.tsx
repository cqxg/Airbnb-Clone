"use client";

import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Container from "../Container";

import { SafeUser } from "@/app/shared/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
            flex
            gap-3
            md:gap-0
            flex-row
            items-center
            justify-between
          "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
