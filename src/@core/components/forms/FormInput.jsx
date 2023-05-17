import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";

const FormInput = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});

export default FormInput;
