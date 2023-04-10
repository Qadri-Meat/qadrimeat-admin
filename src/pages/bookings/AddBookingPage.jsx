import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React from "react";
import BookingForm from "./components/BookingForm";

const AddBookingPage = () => {
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
