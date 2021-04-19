import React from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PetsIcon from "@material-ui/icons/Pets";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";

const useStyles = makeStyles({
  customBtn: {
    color: "#fefbeb",
    borderColor: "#fefbeb",
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <div className="h-screen">
      <div className="h-1/2 flex justify-center items-center text-center">
        <div className="max-w-screen-md w-full">
          <h1>Looking a job for your cat ?</h1>
          <p className="mb-8">
            Sometimes they get bored and want to make some money. Don't hesitate
            to upload their cv here to help your cats finding a good job on the
            Earth.
          </p>
          <Button
            component={Link}
            to="/registration"
            variant="outlined"
            startIcon={<PetsIcon />}
          >
            Sound good
          </Button>
        </div>
      </div>
      <div className="h-1/2 bg-yellow-500 flex justify-center items-center text-center">
        <div className="max-w-screen-md w-full p-8">
          <h1 className="text-yellow-50">Hiring a cat ?</h1>
          <p className="mb-8 text-yellow-50">
            You need a bodyguard, a mental health doctor or just a roommate.
            This is the best place to find them but please remember that they
            will never work for free.
          </p>
          <Button
            component={Link}
            to="/cats"
            className={classes.customBtn}
            variant="outlined"
            startIcon={<SentimentSatisfiedIcon />}
          >
            Okay...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
