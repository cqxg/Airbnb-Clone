"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Button from "../Button";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SafeListing;
  actionId?: string;
  disabled?: boolean;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  onAction,
  disabled,
  currentUser,
  reservation,
  actionLabel,
  actionId = "",
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const end = new Date(reservation.endDate);
    const start = new Date(reservation.startDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            w-full
            relative
            rounded-xl
            aspect-square
            overflow-hidden
          "
        >
          <Image
            fill
            className="
              h-full
              w-full
              transition
              object-cover
              group-hover:scale-110
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div
            className="
              top-3
              right-3
              absolute
            "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
