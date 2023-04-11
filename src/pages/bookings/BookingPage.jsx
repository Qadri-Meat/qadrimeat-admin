import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Booking Details
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate("/users/add-user")}
            variant="outlined"
            color="primary"
            size="small"
          >
            Update Booking
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate("/users/add-user")}
            variant="outlined"
            color="primary"
            size="small"
          >
            Invoice
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      <Grid container item md={8} spacing={3}>
        <Grid item xs={12}></Grid>
      </Grid>
    </AdminLayout>
  );
};

export default BookingPage;
