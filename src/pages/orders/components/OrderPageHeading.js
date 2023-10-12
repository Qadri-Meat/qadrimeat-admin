import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { pick } from 'helper/pick';

const OrderPageHeading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('');
  const { paid } = pick(location.search);
  const handleYearChange = (event) => {
    const year = event.target.value;
    console.log(year);
    setSelectedYear(year);
    navigate(`/orders?year=${year}`);
  };
  const handlePaidToggle = (event, value) => {
    navigate(`/orders?paid=${value}`);
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
        <Grid sx={{ marginLeft: '450px' }} item>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="demo-simple-select-label">
              Year
            </InputLabel>
            <Select
              label="Year"
              onChange={handleYearChange}
              variant="outlined"
            >
              <MenuItem value={'2022'}>2022</MenuItem>
              <MenuItem value={'2023'}>2023</MenuItem>
            </Select>
          </FormControl>
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
