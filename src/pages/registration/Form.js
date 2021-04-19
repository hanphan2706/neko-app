import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import { ImagesUpload } from "@components";

const JOBS = [
  {
    id: "bodyguard",
    name: "Bodyguard",
  },
  {
    id: "mentalHealthDoctor",
    name: "Mental Health Doctor",
  },
  {
    id: "roommate",
    name: "Roommate",
  },
];

const Form = ({ onSubmit, setErrorMessage }) => {
  const [data, setData] = useState({
    name: "",
    jobType: JOBS[0].id,
    jobDescription: "",
    avatar: null,
  });

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setData({ ...data, [name]: value });
  };

  const handleUploadDone = ({ data: imgFiles, error }) => {
    if (error) setErrorMessage(message);
    if (imgFiles && imgFiles.length > 0)
      setData({ ...data, avatar: imgFiles[0] });
  };

  const submitForm = () => onSubmit(data);

  const canSubmit = () => data.name.length > 0 && !!data.avatar;

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="w-1/3 pr-8">
          <ImagesUpload
            imgSource={data.avatar ? data.avatar.content : ""}
            onDone={handleUploadDone}
          />
        </div>
        <div className="w-2/3">
          <TextField
            className="w-full mt-8 mb-8"
            id="name"
            label="Name"
            name="name"
            placeholder="Tom"
            value={data.name}
            onChange={handleChange}
            variant="outlined"
            required
            autoFocus
          />
          <div className="mt-8 mb-8">
            <Select
              id="job-type-select"
              variant="outlined"
              className="w-full"
              value={data.jobType}
            >
              {JOBS.map((job) => (
                <MenuItem key={job.id} value={job.id}>
                  {job.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <TextField
            className="mt-8 mb-8"
            id="description"
            name="description"
            onChange={handleChange}
            label="Description"
            type="text"
            value={data.description}
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
          <div className="mt-8 text-center">
            <Button
              variant="outlined"
              className="mt-8"
              disabled={!canSubmit()}
              onClick={submitForm}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default Form;
