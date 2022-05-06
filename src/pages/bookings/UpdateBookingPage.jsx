import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from 'state/ducks/booking/actions';
import * as types from 'state/ducks/booking/types';
import BookingForm from './components/BookingForm';
import { ADD_ALL_TO_CART } from 'state/ducks/cart/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  my3: {
    margin: '1.3rem 0',
  },
  mRight: {
    marginRight: '.85rem',
  },
}));

const UpdateBookingPage = (props) => {
  const { history, match } = props;
  const bookingId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, selectedBooking } = useSelector((state) => state.booking);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: types.BOOKING_RESET });
        history.push(`/bookings/${bookingId}`);
      } else if (!selectedBooking) {
        dispatch(getBooking(bookingId));
      } else if (selectedBooking) {
        console.log('test', selectedBooking.bookingItems);
        dispatch({
          type: ADD_ALL_TO_CART,
          payload: selectedBooking.bookingItems,
        });
      }
    } else {
      history.push('/login');
    }
  }, [history, success, authUser, bookingId, selectedBooking, dispatch]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update Booking
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {selectedBooking ? (
          <BookingForm preloadedValues={selectedBooking} />
        ) : (
          <></>
        )}
      </div>
    </AdminLayout>
  );
};

export default UpdateBookingPage;
