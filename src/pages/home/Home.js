import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PetsIcon from "@material-ui/icons/Pets";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";

const useStyles = makeStyles((theme) => ({
  customBtn: {
    color: "#fefbeb",
    borderColor: "#fefbeb",
  },
  icon: {
    "&:first-child": {
      [theme.breakpoints.down("md")]: {
        fontSize: "1.5rem",
      },
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className="h-screen min-h-screen">
      <div className="h-1/2 flex justify-center items-center text-center">
        <div className="max-w-screen-md w-full">
          <h1 className="font-semibold">Looking a job for your cat ?</h1>
          <p className="mt-4 mb-16 lg:mt-2 lg:mb-8">
            Sometimes they get bored and want to make some money. Don't hesitate
            to upload their cv here to help your cats finding a good job on the
            Earth.
          </p>
          <Button
            component={Link}
            to="/registration"
            variant="outlined"
            startIcon={<PetsIcon classes={{ root: classes.icon }} />}
          >
            Sound good
          </Button>
        </div>
      </div>
      <div className="h-1/2 bg-yellow-500 flex justify-center items-center text-center">
        <div className="max-w-screen-md w-full p-8 text-yellow-50">
          <h1 className="font-semibold">Hiring a cat ?</h1>
          <p className="mt-4 mb-16 lg:mt-2 lg:mb-8">
            You need a bodyguard, a mental health doctor or just a roommate.
            This is the best place to find them but please remember that they
            will never work for free.
          </p>
          <Button
            component={Link}
            to="/cats"
            className={classes.customBtn}
            variant="outlined"
            startIcon={<SentimentSatisfiedIcon className={classes.icon} />}
          >
            Okay...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
