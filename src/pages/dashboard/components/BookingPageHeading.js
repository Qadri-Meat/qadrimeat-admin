import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

const BookingPageHeading = ({ todayReport }) => {
  const navigate = useNavigate();
  const { totalBookings, orderSales, bookingSales, expenses } =
    todayReport || {};

  return (
    <Grid container spacing={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Today's Bookings
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {totalBookings || 0}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate('/bookings')}
              >
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Today's Sales
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Rs {orderSales + bookingSales || 0}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Today's Expenses
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Rs {expenses || 0}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href="/expenses">
                View All
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BookingPageHeading;
