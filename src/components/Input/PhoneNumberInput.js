import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { Controller } from 'react-hook-form';

const PhoneNumberInput = ({
  country,
  name,
  ref,
  label,
  control,
  defaultValue,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={<PhoneInput labelId={labelId} label={label} country={country} />}
        inputRef={ref}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default PhoneNumberInput;
