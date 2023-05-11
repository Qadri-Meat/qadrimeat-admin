import React from "react";
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

const DashboardPage = (props) => {
  const navigate = useNavigate();

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
                  Rs {/* {todayReport ? todayReport.totalBookings || 0 : 0} */}
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
                  {/* {todayReport
                    ? (todayReport.orderSales || 0) +
                      (todayReport.bookingSales || 0)
                    : 0} */}
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
                  Rs {/* Rs {todayReport ? todayReport.expenses || 0 : 0} */}
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
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper style={{ padding: 10, marginTop: 15 }} variant="outlined">
            <Typography variant="h5">Total Bookings</Typography>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
