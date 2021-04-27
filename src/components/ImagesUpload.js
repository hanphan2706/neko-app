import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Icon, CircularProgress } from "@material-ui/core";
import { FileUpload } from "@components";

const useStyles = makeStyles({
  disabled: {
    opacity: 0.5,
  },
  label: {
    bottom: "calc(50% - 18px)",
  },
  rightBottomLabel: {
    right: "calc(50% - 18px)",
    bottom: 0,
  },
});

export const ImagesUpload = ({ multiple, inputName, imgSource, onDone }) => {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);

  const handleReadingFile = () => {
    setIsUploading(true);
  };

  const handleUploadDone = (result) => {
    setIsUploading(false);
    onDone(result);
  };

  return (
    <div className="relative rounded-full h-48 w-48 flex items-center justify-center border border-gray-400">
      {imgSource && (
        <img
          className="rounded-full w-full h-full"
          src={imgSource}
          alt="image"
        />
      )}
      <FileUpload
        multiple={multiple}
        inputName={inputName}
        disabled={isUploading}
        onReadingFile={handleReadingFile}
        onDone={handleUploadDone}
      />
      <div
        className={clsx(
          "flex justify-center flex-wrap absolute",
          classes.label,
          imgSource && classes.rightBottomLabel
        )}
      >
        <label
          htmlFor={inputName}
          className={clsx(
            !isUploading && classes.disabled,
            "flex items-center justify-center relative overflow-hidden cursor-pointer"
          )}
        >
          {isUploading ? (
            <CircularProgress size={24} />
          ) : (
            <Icon fontSize="large" color="action">
              cloud_upload
            </Icon>
          )}
        </label>
      </div>
    </div>
  );
};

ImagesUpload.defaultProps = {
  inputName: "input-upload",
  multiple: false,
  imgSource: null,
};

ImagesUpload.propTypes = {
  multiple: PropTypes.bool,
  inputName: PropTypes.string,
  imgSource: PropTypes.string,
  onDone: PropTypes.func.isRequired,
};
