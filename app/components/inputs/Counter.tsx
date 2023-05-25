"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  value: number;
  title: string;
  subtitle: string;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-10
            h-10
            flex
            transition
            rounded-full
            border-[1px]
            items-center
            justify-center
            cursor-pointer
            text-neutral-600
            hover:opacity-80
            border-neutral-400
          "
        >
          <AiOutlineMinus />
        </div>
        <div
          className="
            font-light
            text-xl
            text-neutral-600
          "
        >
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
            w-10
            flex
            h-10
            transition
            border-[1px]
            rounded-full
            items-center
            justify-center
            cursor-pointer
            hover:opacity-80
            text-neutral-600
            border-neutral-400
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
