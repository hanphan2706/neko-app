import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

export const BackToHomeBtn = () => (
  <Button to="/" component={Link} startIcon={<KeyboardBackspaceIcon />}>
    back to home
  </Button>
);
