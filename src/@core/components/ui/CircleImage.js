import React, { createRef, useState } from "react";
import { Avatar, Button as MuiButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  CloudUpload as MuiCloudUpload,
  Delete as MuiDelete,
} from "@mui/icons-material";
import { spacing } from "@material-ui/system";
import styled from "styled-components";

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 10px auto 10px;
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

const CircleImage = ({ image, setImage }) => {
  const [file, setFile] = useState(null);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(file);
    inputFileRef.current.value = null;
  };

  const setImage1 = (newImage) => {
    if (file) {
      cleanup();
    }
    setFile(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(newImage);
      setImage1(URL.createObjectURL(newImage));
    }
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = (event) => {
    if (file) {
      event.preventDefault();
      setImage1(null);
      setImage();
    }
  };

  return (
    <CenteredContent>
      <BigAvatar
        $withBorder
        alt="Avatar"
        src={file || image}
        imgProps={{
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          },
        }}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          mb={2}
          onClick={handleClick}
        >
          {file ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
          {file ? "Reset" : "Upload"}
        </Button>
      </label>
      <Typography variant="caption" display="block" gutterBottom>
        For best results, use an image that is at least 128x 128 pixels in .jpg
        format
      </Typography>
    </CenteredContent>
  );
};

export default CircleImage;
