import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import BookingForm from "./components/BookingForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking } from "store/booking";
import { addAllToCart } from "store/cart";
import withAuth from "hooks/withAuth";
const UpdateBookingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { success, selectedBooking } = useSelector((state) => state.booking);
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate(`/bookings/${id}`);
    } else if (!selectedBooking) {
      dispatch(getBooking(id));
    } else if (selectedBooking) {
      dispatch(addAllToCart(selectedBooking.bookingItems));
    }
  }, [navigate, success, id, selectedBooking, dispatch]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Update Booking
          </Typography>
        </Grid>
      </Grid>
      <div>
        {selectedBooking ? (
          <BookingForm preloadedValues={selectedBooking} />
        ) : (
          <></>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(UpdateBookingPage);
