import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Stepper, IconButton, Step, StepLabel } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import HomeIcon from "@material-ui/icons/Home";
import Policy from "./Policy";
import Form from "./Form";
import ThankYouMessage from "./ThankYouMessage";
import { gql, useMutation } from "@apollo/client";

const REGISTRATION_STEPS = [
  {
    id: "policy",
    label: "Agree to our policy",
  },
  { id: "uploadCv", label: "Upload cv of your cat" },
  {
    id: "done",
    label: "Confirm and finish",
  },
];

const CREATE_PET_PROFILE = gql`
  mutation createPetProfile($input: PetInput!) {
    createPetProfile(input: $input) {
      payload {
        id
      }
      error {
        code
        messsage
      }
    }
  }
`;

const Registration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createPetProfile] = useMutation(CREATE_PET_PROFILE);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmitFom = ({ name, jobType, jobDescription }) => {
    createPetProfile({
      variables: { input: { name, jobType, jobDescription } },
    }).then((createPetProfileRes) => {
      const {
        data: {
          createPetProfile: { payload, error },
        },
      } = createPetProfileRes;
      if (error) setErrorMessage(error.message);
      if (payload && payload.id) nextStep();
    });
  };

  const nextStep = () => setActiveStep(activeStep + 1);

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Policy onAgreed={nextStep} />;
      case 1:
        return (
          <>
            {errorMessage && errorMessage.length > 0 ? (
              <Alert severity="error">{errorMessage}</Alert>
            ) : (
              <></>
            )}
            <Form
              onSubmit={handleSubmitFom}
              setErrorMessage={setErrorMessage}
            />
          </>
        );
      case 2:
        return <ThankYouMessage />;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex h-screen justify-center">
      <div className="max-w-screen-md w-full p-8">
        <div className="mb-8 mt-8 text-center">
          <IconButton component={Link} to="/">
            <HomeIcon />
          </IconButton>
          <h1>Just a few steps to get your cat the first job</h1>
        </div>
        <Stepper activeStep={activeStep}>
          {REGISTRATION_STEPS.map((step) => (
            <Step key={step.id}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="mt-16">{renderStepContent(activeStep)}</div>
      </div>
    </div>
  );
};

export default Registration;
