"use client";

import Image from "next/image";

const Avatar = () => (
  <Image
    width="30"
    height="30"
    alt="Avatar"
    className="rounded-full"
    src="/images/placeholder.jpg"
  />
);

export default Avatar;
