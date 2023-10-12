import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { pick } from 'helper/pick';

const OrderPageHeading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paid } = pick(location.search);
  const handlePaidToggle = (event, value) => {
    navigate(`/orders?paid=${value}`);

    // useEffect(() => {
    //   if (success) {
    //     dispatch(resetBooking());
    //   } else {
    //     dispatch(
    //       getBookings(
    //         `${paid !== undefined ? `isPaid=${paid}&` : ''}${query}`
    //       )
    //     );
    //   }
    // }, [dispatch, paid, query, success]);
  };
  return (
    <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
      <Grid item>
        <Typography variant="h5" component="h1">
          Orders
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        xs={10}
      >
        <Grid item>
          <Button
            onClick={() => navigate('/orders/add-order')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Order
          </Button>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            color="primary"
            style={{ marginRight: '10px' }}
            value={paid}
            size="small"
            exclusive
            onChange={handlePaidToggle}
          >
            <ToggleButton value="true">Paid</ToggleButton>
            <ToggleButton value="false">UnPaid</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderPageHeading;
