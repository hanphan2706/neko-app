import React, { useRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { FILE_TYPE, IMAGE_FILE_ACCEPTED_TYPES } from "@shared/constants";

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({ id: uuidv4(), file, content: reader.result });
    };
  });
};

const getAcceptedFileTypes = (type) => {
  switch (type) {
    case FILE_TYPE.Image:
      return IMAGE_FILE_ACCEPTED_TYPES;
    default:
      return null;
  }
};

export const FileUpload = ({
  multiple,
  inputName,
  accept,
  type,
  disabled,
  onReadingFile,
  onDone,
}) => {
  const inputRef = useRef();
  const acceptedFileTypes = getAcceptedFileTypes(type);

  const handleChange = (e) => {
    const {
      target: { files },
    } = e;
    if (!files || (files && files.length === 0)) return;

    onReadingFile();

    const data = [];
    for (let i = 0; i < files.length; i++) {
      if (acceptedFileTypes && !acceptedFileTypes.includes(files[i].type)) {
        onDone({
          error: {
            message: "Content type not supported",
          },
        });
        break;
      }
      readFile(files[i])
        .then((file) => {
          data.push(file);
          if (data.length === files.length) {
            inputRef.current.value = "";
            onDone({ data });
          }
        })
        .catch(() => {
          onDone({
            error: { message: "Something went wrong, please try again!" },
          });
        });
    }
  };

  return (
    <input
      className="hidden"
      ref={inputRef}
      multiple={multiple}
      accept={accept}
      id={inputName}
      type="file"
      disabled={disabled}
      onChange={handleChange}
    />
  );
};

FileUpload.defaultProps = {
  multiple: false,
  inputName: "input-upload",
  accept: "image/*",
  type: FILE_TYPE.Image,
  onReadingFile: () => {},
  disabled: false,
};

FileUpload.propTypes = {
  multiple: PropTypes.bool,
  inputName: PropTypes.string,
  accept: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onReadingFile: PropTypes.func,
  onDone: PropTypes.func.isRequired,
};
