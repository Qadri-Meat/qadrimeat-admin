import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteBooking,
  getBookings,
  resetBooking,
} from 'store/booking';
import withAuth from 'hooks/withAuth';
import { numberWithCommas } from 'helper/numers';
import FileOpenIcon from '@mui/icons-material/FileOpenOutlined';
import { buildURLQuery } from '@core/utils/buildURLQuery';

const AllBookingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  const { results, totalResults, success, loading } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (success) {
      dispatch(resetBooking());
    } else {
      dispatch(getBookings(buildURLQuery(query)));
    }
  }, [dispatch, query, success]);

  const onDelete = (value) => {
    dispatch(deleteBooking(value));
  };

  const columns = [
    {
      name: 'id',
      label: 'View',
      options: {
        filter: false,
        customBodyRender: (values, tableMeta, updateValue) => {
          return (
            <Button href={`/bookings/${values}`}>
              <FileOpenIcon />
            </Button>
          );
        },
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: false,
      },
    },
    {
      name: 'shippingDetails',
      label: 'Name',
      options: {
        filter: false,
        customBodyRender: (values, tableMeta, updateValue) => {
          if (!values || !values.firstName) {
            return '';
          }
          return (
            <>{values.firstName + ' ' + (values.lastName || '')}</>
          );
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {new Date(value).toLocaleDateString()},{' '}
              {new Date(value).toLocaleTimeString()}
            </>
          );
        },
      },
    },
    {
      name: 'totalPrice',
      label: 'TOTAL',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{numberWithCommas(value)}</>;
        },
      },
    },
    {
      name: 'totalPrice',
      label: 'Total Paid',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          const totalPaid = results[rowIndex].transactions.reduce(
            function (a, b) {
              return a + b.amount;
            },
            0
          );

          return <>{numberWithCommas(totalPaid)}</>;
        },
      },
    },
    {
      name: 'totalPrice',
      label: 'Balance',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          const totalPaid = results[rowIndex].transactions.reduce(
            function (a, b) {
              return a + b.amount;
            },
            0
          );

          return <>{numberWithCommas(value - totalPaid)}</>;
        },
      },
    },
  ];

  return (
    <>
      <AdminLayout>
        <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              Bookings
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            xs={10}
          >
            <Grid item>
              <Button
                style={{ marginRight: '10px' }}
                onClick={() => navigate('/bookings/add-booking')}
                variant="outlined"
                color="primary"
                size="small"
              >
                Add Booking
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          loading={loading}
          title={'Booking List'}
          results={results}
          totalResults={totalResults}
          columns={columns}
          query={query}
          setQuery={setQuery}
          onDelete={onDelete}
        />
      </AdminLayout>
    </>
  );
};

export default withAuth(AllBookingsPage);
