import React from "react";
import { BackToHomeBtn } from "@components";

const ThankYouMessage = () => {
  return (
    <div className="text-center">
      <p className="mb-8">
        Your cat's profile has been created successfully. We will contact you
        soon!
      </p>
      <BackToHomeBtn />
    </div>
  );
};

export default ThankYouMessage;
