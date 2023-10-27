import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useState } from 'react';
import {
  DialogActions,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import DateRangePicker from 'pages/stocks/components/DateRangePicker';

const CustomFilters = ({ show, setShow, filters, setFilters }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleClose = () => {
    setShow(false);
  };

  const handleReset = (event, value) => {
    setFilters(null);
    setShow(false);
  };

  const handleTypeChange = (event, value) => {
    setFilters({ ...filters, type: event.target.value });
    setShow(false);
  };

  const handlePaidChange = (event, value) => {
    setShow(false);
  };

  const handleStartDateChange = (event, value) => {};

  const handleEndDateChange = (event, value) => {};

  return (
    <Dialog open={show} onClose={handleClose} fullWidth>
      <DialogTitle>Filter Data</DialogTitle>
      <DialogContent>
        <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            xs={10}
          >
            <DateRangePicker
              startDate={filters.startDate}
              setStartDate={setStartDate}
              endDate={filters.endDate}
              setEndDate={setEndDate}
            />

            <Grid item>
              <ToggleButtonGroup
                color="primary"
                style={{ marginRight: '10px', marginTop: '10px' }}
                value={filters.isPaid}
                size="small"
                exclusive
                onChange={handlePaidChange}
              >
                <ToggleButton value="true">Paid</ToggleButton>
                <br></br>
                <ToggleButton value="false">UnPaid</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                color="primary"
                style={{ marginRight: '10px', marginTop: '10px' }}
                value={filters.type}
                size="small"
                exclusive
                onChange={handleTypeChange}
              >
                <ToggleButton value="online">Online</ToggleButton>
                <ToggleButton value="retail">Retail</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid item>
          <Button
            style={{ marginRight: '10px', marginTop: '10px' }}
            onClick={handleReset}
            variant="outlined"
            color="primary"
            size="small"
          >
            Clear Filter
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{ marginRight: '10px', marginTop: '10px' }}
            onClick={handleClose}
            variant="outlined"
            color="primary"
            size="small"
          >
            Close
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default CustomFilters;
