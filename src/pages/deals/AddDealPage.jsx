import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React from "react";

const AddDealPage = () => {
  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Add New Deal
            {/* {details ? "Update User" : "Create User"} */}
          </Typography>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AddDealPage;
