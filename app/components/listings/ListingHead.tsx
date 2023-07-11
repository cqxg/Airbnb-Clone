"use client";

import Image from "next/image";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          w-full
          h-[60vh]
          relative
          rounded-xl
          overflow-hidden
        "
      >
        <Image
          fill
          alt="Image"
          src={imageSrc}
          className="object-cover w-full"
        />
        <div
          className="
            top-5
            right-5
            absolute
          "
        >
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
