"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DatePickerProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      minDate={new Date()}
      showDateDisplay={false}
      rangeColors={["#262626"]}
      disabledDates={disabledDates}
    />
  );
};

export default DatePicker;
