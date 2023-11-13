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
import { getStartAndEndDateOfPastWeek } from '@core/utils/getStartAndEndDateOfWeek';

import { buildURLQuery } from '@core/utils/buildURLQuery';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const dates = getStartAndEndDateOfPastWeek();
  const [query, setQuery] = useState({ ...dates });

  const [showPaymentStatusFilter, setShowPaymentStatusFilter] =
    useState(false);
  const [showOrderTypeFilter, setShowOrderTypeFilter] =
    useState(false);
  console.log(setShowPaymentStatusFilter, setShowOrderTypeFilter);

  const { todayReport, reports, deals, loading, stockReport } =
    useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDashboard(buildURLQuery(query)));
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
            ) : null}
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
            ) : null}
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
                showPaymentStatusFilter={showPaymentStatusFilter}
                showOrderTypeFilter={showOrderTypeFilter}
                query={query}
                setQuery={setQuery}
                stockReport={stockReport}
                loading={loading}
              />
            ) : null}
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default withAuth(DashboardPage);
