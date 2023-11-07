import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React from 'react';

const CustomToggle = ({ label, value, onChange, options }) => {
  return (
    <>
      <Typography variant="body">{label}</Typography>
      <ToggleButtonGroup
        color="primary"
        style={{ marginRight: '10px', marginTop: '10px' }}
        value={value}
        size="small"
        exclusive
        onChange={(e, value) => onChange(value)}
      >
        {options.map((option) => (
          <ToggleButton key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default CustomToggle;
