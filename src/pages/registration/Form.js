import React, { useState } from "react";
import { TextField, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { UploadImage } from "@components";

const JOBS = [
  {
    id: "bodyguard",
    name: "bodyguard",
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

const Form = () => {
  const [data, setData] = useState({
    name: "",
    jobType: "",
    jobDescription: "",
    avatar: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setData({ ...data, [name]: value });
  };

  const handleReadFileDone = ({ imgFiles }) => {
    console.log(imgFiles);
    if (imgFiles && imgFiles.length > 0)
      setData({ ...data, avatar: imgFiles[0] });
  };

  const handleUploadFileError = ({ message }) => {
    console.log(message);
    setErrorMessage(message);
  };

  return (
    <div className="flex flex-col">
      {errorMessage && errorMessage.length > 0 ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : (
        <></>
      )}
      <div className="mt-8 mb-8">
        <TextField
          id="name"
          label="name"
          name="name"
          placeholder="Tom"
          value={data.name}
          onChange={handleChange}
          variant="outlined"
        />
      </div>
      <div className="mt-8 mb-8">
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Job type
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="job-type-select"
          variant="outlined"
        >
          {JOBS.map((job) => (
            <MenuItem key={job.id} value={job.name}>
              {job.name}
            </MenuItem>
          ))}
        </Select>
      </div>

      <UploadImage
        onReadFileDone={handleReadFileDone}
        onError={handleUploadFileError}
      />
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
    </div>
  );
};

export default Form;
