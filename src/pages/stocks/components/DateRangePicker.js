import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

/**
 * A component for picking a date range using Material-UI.
 */
export default function DateRangePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  /**
   * Handle changes to the start date.
   * @param {Date} date - The new selected start date.
   */
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  /**
   * Handle changes to the end date.
   * @param {Date} date - The new selected end date.
   */
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Grid container justifyContent="space-around">
      {/* Start Date */}
      <TextField
        id="start-date-picker"
        label="Start Date"
        type="date"
        defaultValue={startDate.toISOString().split('T')[0]}
        onChange={(e) =>
          handleStartDateChange(new Date(e.target.value))
        }
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* End Date */}
      <TextField
        id="end-date-picker"
        label="End Date"
        type="date"
        defaultValue={endDate.toISOString().split('T')[0]}
        onChange={(e) =>
          handleEndDateChange(new Date(e.target.value))
        }
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  );
}
