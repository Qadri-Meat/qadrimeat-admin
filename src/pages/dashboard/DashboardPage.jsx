import React, { useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Grid,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import AdminBarChart from '../../components/AdminChart/AdminBarChart';
import AdminPieChart from '../../components/AdminChart/AdminPieChart';
import clsx from 'clsx';
import { getDashboard } from 'state/ducks/user/actions';
import BookingTable from './components/BookingTable';

const useStyles = makeStyles((them) => ({
  paddingPaper: {
    padding: '10px 5px 5px 10px',
  },
  mt: {
    marginTop: 13,
  },
  titlePaper: {
    marginBottom: '16px',
  },
  visitorChart: {
    // height: "150px"
  },
}));

const DashboardPage = (props) => {
  const { history } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const { data, deals } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(authUser);
    if (!authUser) {
      history.push('/login');
    } else {
      dispatch(getDashboard());
    }
  }, [history, authUser, dispatch]);

  return (
    <AdminLayout>
      <h1>Dashboard</h1>

      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Orders
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data ? data.totalOrders : 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/orders">
                  View All
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Bookings
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {data ? data.totalBookings : 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href="/bookings">
                  View All
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Today's Sales
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Rs {data ? data.ordersSales + data.bookingsSales : 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Today's Expenses
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Rs {data ? data.expenses : 0}
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
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Paper
              className={clsx(classes.paddingPaper, classes.mt)}
              variant="outlined"
            >
              <Typography className={classes.titlePaper} variant="h5">
                Total Bookings
              </Typography>
              {deals ? <BookingTable deals={deals} /> : <></>}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
