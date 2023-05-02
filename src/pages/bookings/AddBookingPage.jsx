import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import BookingForm from "./components/BookingForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddBookingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, selectedBooking } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (success) {
        navigate(`/bookings`);
      }
    } else {
      navigate("/login");
    }
  }, [success, dispatch, navigate, user, selectedBooking]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Add New Booking
          </Typography>
        </Grid>
      </Grid>
      <div>
        <BookingForm />
      </div>
    </AdminLayout>
  );
};

export default AddBookingPage;
