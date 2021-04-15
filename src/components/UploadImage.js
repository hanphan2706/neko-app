import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Icon, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash";

const IMAGE_TYPES_ACCEPTED = ["image/jpg", "image/jpeg", "image/png"];

const useStyles = makeStyles((theme) => ({
  disabled: {
    opacity: 0.5,
  },
}));

export const UploadImage = ({
  multiple,
  onError,
  onReadFileDone,
  inputName,
}) => {
  const inputRef = useRef();
  const classes = useStyles();
  const inputUploadName = `input-upload-${inputName}`;
  const [isUploading, setIsUploading] = useState(false);

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ id: uuidv4(), file, content: reader.result });
      };
    });
  };

  const handleUploadChange = (e) => {
    const {
      target: { files },
    } = e;
    if (isEmpty(files)) return;

    setIsUploading(true);

    const imgFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (IMAGE_TYPES_ACCEPTED.includes(files[i].type)) {
        readFile(files[i])
          .then((imgFile) => {
            imgFiles.push(imgFile);
            if (imgFiles.length === files.length) {
              inputRef.current.value = "";
              onReadFileDone({ imgFiles });
              setIsUploading(false);
            }
          })
          .catch(() => {
            setIsUploading(false);
            onError({ message: "Something went wrong, please try again" });
          });
      } else {
        setIsUploading(false);
        onError({
          message: "Content type not supported. Please upload jpg/jpeg/png",
        });
      }
    }
  };

  return (
    <div className="flex justify-end w-full">
      <input
        ref={inputRef}
        multiple={multiple}
        accept="image/*"
        className="hidden"
        id={inputUploadName}
        type="file"
        disabled={isUploading}
        onChange={handleUploadChange}
      />
      <div className="flex justify-center sm:justify-start flex-wrap">
        <label
          htmlFor={inputUploadName}
          className={clsx(
            !isUploading && classes.disabled,
            "flex items-center justify-center relative rounded-4 mr-16 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5 w-64 h-32"
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

UploadImage.defaultProps = {
  inputName: "images",
  multiple: false,
};

UploadImage.propTypes = {
  onReadFileDone: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  inputName: PropTypes.string,
};
