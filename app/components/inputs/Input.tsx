"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  errors,
  disabled,
  register,
  required,
  formatPrice,
  type = "text",
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            top-5
            left-2
            absolute
            text-neutral-700
          "
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        className={`
          p-4
          peer
          pt-6
          w-full
          bg-white
          border-2
          font-light
          rounded-md
          transition
          outline-none
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          z-10
          top-5
          text-md
          absolute
          transform
          origin-[0]
          duration-150
          -translate-y-3
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-placeholder-shown:scale-100
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:translate-y-0
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
