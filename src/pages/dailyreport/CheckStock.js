import React, { useEffect } from "react";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDashboard } from "store/user";
import withAuth from "hooks/withAuth";
import DailyReporyTable from "./components/DailyReportTable";

const CheckStock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return (
    <AdminLayout>
      <h2>Dashboard</h2>
      <AdminBreadcrumbs />
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Today's Report
                </Typography>
                <Typography
                  sx={{ mb: 1.5 }}
                  color="text.secondary"
                ></Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/bookings")}>
                  View All
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}></Grid>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 20 }} container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper style={{ padding: 10, marginTop: 15 }} variant="outlined">
            <Typography variant="h5">Total Report</Typography>
            <DailyReporyTable />
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default withAuth(CheckStock);
