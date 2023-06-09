import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { Controller } from "react-hook-form";

const CheckBoxInput = ({
  name,
  ref,
  label,
  control,
  defaultValue,
  ...props
}) => {
  return (
    <FormControlLabel
      control={
        <Controller
          control={control}
          inputRef={ref}
          name={name}
          render={({ onChange, value }) => (
            <Checkbox
              onChange={(e) => onChange(e.target.checked)}
              defaultChecked={false}
              checked={value}
            />
          )}
        />
      }
      label={label}
    />
  );
};
export default CheckBoxInput;
