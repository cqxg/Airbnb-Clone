"use client";

import Logo from "./Logo";
import Search from "./Search";
import Container from "../Container";

const Navbar = () => (
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
        </div>
      </Container>
    </div>
  </div>
);

export default Navbar;
