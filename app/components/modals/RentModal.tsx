"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Map from "../Map";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import { categories } from "../navbar/Categories";
import useRentModal from "@/app/hooks/useRentModal";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const {
    watch,
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      price: 1,
      title: "",
      roomCount: 1,
      category: "",
      imageSrc: "",
      guestCount: 1,
      location: null,
      description: "",
      bathroomCount: 1,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const location = watch("location");
  const category = watch("category");
  const imageSrc = watch("imageSrc");
  const roomCount = watch("roomCount");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        subtitle="Pick a category"
        title="Which of these best describes your place?"
      />
      <div
        className="
          grid
          gap-3
          grid-cols-1
          max-h-[50vh]
          md:grid-cols-2
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          title="Guests"
          value={guestCount}
          subtitle="How many guests do you allow?"
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          value={roomCount}
          subtitle="How many rooms do you have?"
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          value={bathroomCount}
          subtitle="How many bathrooms do you have?"
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          required
          id="title"
          label="Title"
          errors={errors}
          register={register}
          disabled={isLoading}
        />
        <hr />
        <Input
          required
          errors={errors}
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          required
          id="price"
          formatPrice
          label="Price"
          type="number"
          errors={errors}
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      title="Airbnb your home!"
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
