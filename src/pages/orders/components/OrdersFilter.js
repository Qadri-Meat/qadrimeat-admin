import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  DialogActions,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DateRangePicker from 'pages/stocks/components/DateRangePicker';
import { buildURLQuery } from '@core/utils/buildURLQuery';
import { isNullOrEmpty } from 'helper/helpers';

const OrdersFilter = ({
  show,
  setShow,
  preloadedValues,
  id,
  setOrderType,
  setQuery,
  orderType,
  setPaid,
  paid,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };
  const handleResetFilter = (event, value) => {
    setOrderType('');
    setPaid('');
    setQuery('');
    navigate('/orders');
    setShow(false);
  };
  const handleOrderType = (event, value) => {
    setOrderType(value);
    console.log(orderType);
    setShow(false);
  };
  const handleclose = (event, value) => {
    setShow(false);
  };
  const handlePaidToggle = (event, value) => {
    setPaid(value);
    setShow(false);
  };
  useEffect(() => {
    if (!isNullOrEmpty(startDate) && !isNullOrEmpty(endDate)) {
      setQuery(
        buildURLQuery({
          startDate,
          endDate,
        })
      );
      setShow(false); // Close the dialog only when both start and end dates are selected
    }
  }, [setQuery, startDate, endDate, setShow]);

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
            <Typography variant="h6">Date Range</Typography>
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />

            <Grid item>
              <Typography variant="h6">Status</Typography>
              <ToggleButtonGroup
                color="primary"
                style={{ marginRight: '10px', marginTop: '10px' }}
                value={paid}
                size="small"
                exclusive
                onChange={handlePaidToggle}
                xs={10}
              >
                <ToggleButton value="true">Paid</ToggleButton>
                <br></br>
                <ToggleButton value="false">UnPaid</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <br></br>
            <Grid item>
              <Typography variant="h6">Order Type</Typography>
              <ToggleButtonGroup
                color="primary"
                style={{ marginRight: '10px', marginTop: '10px' }}
                value={orderType}
                size="small"
                exclusive
                onChange={handleOrderType}
                xs={10}
                l={12}
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
            onClick={handleResetFilter}
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
            onClick={handleclose}
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

export default OrdersFilter;
