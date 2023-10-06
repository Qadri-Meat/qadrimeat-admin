import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingPageHeading = ({ todayReport }) => {
  const navigate = useNavigate();
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
                {todayReport ? todayReport.totalBookings || 0 : 0}
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
                Rs{' '}
                {todayReport
                  ? (todayReport.orderSales || 0) +
                    (todayReport.bookingSales || 0)
                  : 0}
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
                Rs {todayReport ? todayReport.expenses || 0 : 0}
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
