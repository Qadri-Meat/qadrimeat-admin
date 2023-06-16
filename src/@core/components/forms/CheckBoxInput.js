import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
const CheckBoxInput = forwardRef(
  ({ name, ref, label, children, control, helperText, ...props }) => {
    const labelId = `${name}-label`;
    return (
      <FormControl variant="outlined" margin="normal" fullWidth {...props}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Controller
          render={({ field }) => (
            <Checkbox
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value || false}
              value={field.value ? "true" : "false"} // Provide an explicit value prop
            />
          )}
          name={name}
          control={control}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }
);

export default CheckBoxInput;
