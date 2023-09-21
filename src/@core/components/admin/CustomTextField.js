import React from "react";
import { TextField, FormControl, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

function CustomTextField({ name, control, rules, error, inputProps, ...rest }) {
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <Controller
        name={name || ""}
        control={control}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...rest}
            value={field.value}
            onBlur={field.onBlur}
            onChange={field.onChange}
            error={Boolean(error)}
            InputProps={{
              inputProps: inputProps,
            }}
          />
        )}
      />
      {error && (
        <FormHelperText sx={{ color: "error.main" }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
export default CustomTextField;
