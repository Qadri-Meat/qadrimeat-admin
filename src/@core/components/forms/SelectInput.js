import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
const SelectInput = forwardRef(
  ({ name, ref, label, children, control, helperText, ...props }) => {
    const labelId = `${name}-label`;
    return (
      <FormControl variant="outlined" margin="normal" fullWidth {...props}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Controller
          render={({ field }) => (
            <Select labelId={labelId} label={label} {...field}>
              {children}
            </Select>
          )}
          name={name}
          control={control}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    );
  }
);

export default SelectInput;
