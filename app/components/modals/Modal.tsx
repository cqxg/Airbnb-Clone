"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  disabled?: boolean;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  body,
  title,
  isOpen,
  footer,
  onClose,
  disabled,
  onSubmit,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
          flex 
          z-50 
          fixed 
          inset-0 
          items-center 
          outline-none 
          justify-center 
          overflow-y-auto 
          overflow-x-hidden 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div
          className="
            my-6
            h-full
            w-full
            mx-auto
            relative
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
            lg:h-auto
            md:h-auto
          "
        >
          {/*content*/}
          <div
            className={`
              h-full
              translate
              duration-300
              ${showModal ? "opacity-100" : "opacity-0"}
              ${showModal ? "translate-y-0" : "translate-y-full"}
            `}
          >
            <div
              className="
                flex
                h-full
                w-full
                flex-col
                relative
                border-0
                translate
                shadow-lg
                lg:h-auto
                md:h-auto
                rounded-lg
                bg-white
                outline-none
                focus:outline-none
              "
            >
              {/*header*/}
              <div
                className="
                  p-6
                  flex
                  relative
                  rounded-t
                  items-center
                  justify-center
                  border-b-[1px]
                "
              >
                <button
                  className="
                    p-1
                    left-9
                    absolute
                    border-0
                    transition
                    hover:opacity-70
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">{body}</div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex
                    gap-4
                    w-full
                    flex-row
                    items-center
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
