import React, { useEffect, useState } from 'react';
import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import AdminBreadcrumbs from '@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs';
import { Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from 'store/user';
import BookingReportsTable from './components/BookingReportsTable';
import BookingTable from './components/BookingTable';
import withAuth from 'hooks/withAuth';
import BookingPageHeading from './components/BookingPageHeading';
import StockTable from './components/StockTable';

const DashboardPage = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState();

  const { todayReport, reports, deals, loading, stockReport } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (query === undefined) {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);

      const startDate = sevenDaysAgo.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];

      const newQuery = `startDate=${startDate}&endDate=${endDate}`;
      dispatch(getDashboard(newQuery));
    } else {
      dispatch(getDashboard(query));
    }
    console.log(query);
  }, [dispatch, query]);

  return (
    <AdminLayout>
      <h2>Dashboard</h2>
      <AdminBreadcrumbs />
      <BookingPageHeading todayReport={todayReport} />
      <Grid style={{ marginTop: 20 }} container spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper
            style={{ padding: 10, marginTop: 15 }}
            variant="outlined"
          >
            <Typography variant="h5">Booking Reports</Typography>
            {reports ? (
              <BookingReportsTable
                reports={reports}
                loading={loading}
              />
            ) : (
              <></>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper
            style={{ padding: 10, marginTop: 15 }}
            variant="outlined"
          >
            <Typography variant="h5">Total Bookings</Typography>
            {deals ? (
              <BookingTable deals={deals} loading={loading} />
            ) : (
              <></>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper
            style={{ padding: 10, marginTop: 15 }}
            variant="outlined"
          >
            <Typography variant="h5">Daily Reports</Typography>
            {stockReport ? (
              <StockTable
                setQuery={setQuery}
                stockReport={stockReport}
                loading={loading}
              />
            ) : (
              <></>
            )}
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default withAuth(DashboardPage);
