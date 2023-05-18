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
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "store/user";
import BookingReportsTable from "./components/BookingRepotTable";
import BookingTable from "./components/BookingTable";
import withAuth from "hooks/withAuth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { todayReport, reports, deals } = useSelector((state) => state.user);

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
                  Today's Bookings
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {todayReport ? todayReport.totalBookings || 0 : 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate("/bookings")}>
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
                  Rs{" "}
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
      <Grid style={{ marginTop: 20 }} container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper style={{ padding: 10, marginTop: 15 }} variant="outlined">
            <Typography variant="h5">Booking Reports</Typography>
            {reports ? <BookingReportsTable reports={reports} /> : <></>}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper style={{ padding: 10, marginTop: 15 }} variant="outlined">
            <Typography variant="h5">Total Bookings</Typography>
            {deals ? <BookingTable deals={deals} /> : <></>}
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default withAuth(DashboardPage);
