"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  disabled?: boolean;
  onSubmit: () => void;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  onSubmit,
  disabled,
  dateRange,
  totalPrice,
  onChangeDate,
  disabledDates,
}) => {
  return (
    <div
      className="
      bg-white
        rounded-xl
        border-[1px]
        overflow-hidden
      border-neutral-200
      "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="
          p-4
          flex
          text-lg
          flex-row
          items-center
          font-semibold
          justify-between
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
