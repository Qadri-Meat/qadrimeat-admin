import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllDealsPage = () => {
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Deals
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate("/deals/add-deal")}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Deal
          </Button>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AllDealsPage;
