import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const Policy = ({ onAgreed }) => {
  return (
    <div className="text-center">
      <p className="mb-8">
        Please make sure you've alreay had permission of your cat before doing
        this.
      </p>
      <Button variant="outlined" onClick={onAgreed}>
        Got it
      </Button>
    </div>
  );
};

Policy.propTypes = {
  onAgreed: PropTypes.func.isRequired,
};

export default Policy;
