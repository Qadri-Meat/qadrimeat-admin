import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { forwardRef } from "react";
import { Controller } from "react-hook-form";
const SelectInput = forwardRef(
  ({ name, ref, label, children, control, ...props }) => {
    const labelId = `${name}-label`;
    return (
      <FormControl variant="outlined" margin="normal" fullWidth {...props}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Controller
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          )}
          name="role"
          control={control}
        />
      </FormControl>
    );
  }
);

export default SelectInput;
