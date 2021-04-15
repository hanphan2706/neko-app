import React, { useState } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import Form from "./Form";

const REGISTRATION_STEPS = [
  {
    id: "enterEmail",
    label: "Enter your mail",
  },
  { id: "uploadCv", label: "Upload cv of your cat" },
  {
    id: "done",
    label: "Confirm and finish",
  },
];

const renderStepContent = (stepIndex) => {
  switch (stepIndex) {
    case 0:
      return <Form />;
    default:
      return "";
  }
};

const Registration = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <div className="flex h-screen justify-center text-center">
      <div className="max-w-screen-md w-full p-8">
        <div className="mb-8 mt-8">
          <h1>Just a few steps to get your cat the first job</h1>
          <p>
            Please make sure you've alreay have permission of your cat before
            doing this.
          </p>
        </div>
        <Stepper activeStep={activeStep}>
          {REGISTRATION_STEPS.map((step) => (
            <Step key={step.id}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
      </div>
    </div>
  );
};

export default Registration;
