"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  small?: boolean;
  icon?: IconType;
  outline?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  small,
  onClick,
  outline,
  disabled,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full
        transition
        relative
        rounded-lg
        hover:opacity-80
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "border-[1px]" : "border-2"}
        ${small ? "font-light" : "font-semibold"}
        ${outline ? "bg-white" : "bg-rose-500"}
        ${outline ? "text-black" : "text-white"}
        ${outline ? "border-black" : "border-rose-500"}
    `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            top-3
            left-4
            absolute
         "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
