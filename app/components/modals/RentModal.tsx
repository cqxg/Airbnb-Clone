"use client";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

const RentModal = () => {
  const rentModal = useRentModal();
  return (
    <Modal
      actionLabel="Submit"
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
    />
  );
};

export default RentModal;
