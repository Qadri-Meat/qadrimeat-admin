import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
    if (!isNullOrEmpty(startDate) && !isNullOrEmpty(endDate))
      setQuery(
        buildURLQuery({
          startDate,
          endDate,
        })
      );
    setShow(false);
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
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
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

            <Grid item>
              <ToggleButtonGroup
                color="primary"
                style={{ marginRight: '10px', marginTop: '10px' }}
                value={paid}
                size="small"
                exclusive
                onChange={handlePaidToggle}
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
                value={orderType}
                size="small"
                exclusive
                onChange={handleOrderType}
              >
                <ToggleButton value="online">Online</ToggleButton>
                <ToggleButton value="retail">Retail</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersFilter;
