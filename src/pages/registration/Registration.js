import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Stepper, IconButton, Step, StepLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Alert } from "@material-ui/lab";
import HomeIcon from "@material-ui/icons/Home";

import { REGISTRATION_STEPS } from "@shared/constants";
import { PetService } from "@services";

import Policy from "./Policy";
import Form from "./Form";
import ThankYouMessage from "./ThankYouMessage";

const useStyles = makeStyles((theme) => ({
  icon: {
    "&:first-child": {
      [theme.breakpoints.down("md")]: {
        fontSize: "3rem",
      },
    },
  },
}));

const Registration = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [createPetProfile] = useMutation(
    PetService.mutations.CREATE_PET_PROFILE
  );
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
      <div className="max-w-screen-lg w-full p-8">
        <div className="text-center">
          <IconButton component={Link} to="/">
            <HomeIcon classes={{ root: classes.icon }} />
          </IconButton>
          <h1 className="mt-8">
            Just a few steps to get your cat the first job
          </h1>
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
