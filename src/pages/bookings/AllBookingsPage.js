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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useLocation } from 'react-router-dom';
import { pick } from 'helper/pick';
import withAuth from 'hooks/withAuth';
import { numberWithCommas } from 'helper/numers';
import FileOpenIcon from '@mui/icons-material/FileOpenOutlined';
import OrdersFilter from 'pages/orders/components/OrdersFilter';

const AllBookingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const [query, setQuery] = useState('');
  const [paid, setPaid] = useState('');
  const [showEditDetails, setShowEditDetails] = useState(false);
  const { results, totalResults, success, loading } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (success) {
      dispatch(resetBooking());
    } else {
      dispatch(
        getBookings(
          `${paid !== undefined ? `isPaid=${paid}&` : ''}${query}`
        )
      );
    }
  }, [dispatch, paid, query, success]);

  const onDelete = (value) => {
    dispatch(deleteBooking(value));
  };
  const handleResetFilter = () => {
    setQuery('');
    navigate('/bookings');
  };

  const handlePaidToggle = (event, value) => {
    navigate(`/bookings?paid=${value}`);
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
            <Grid>
              <Button
                style={{ paddingRight: '10px' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setShowEditDetails(true);
                }}
              >
                Filters
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
          setQuery={setQuery}
          onDelete={onDelete}
        />
      </AdminLayout>
      <OrdersFilter
        setPaid={setPaid}
        paid={paid}
        show={showEditDetails}
        setShow={setShowEditDetails}
        setQuery={setQuery}
      />
    </>
  );
};

export default withAuth(AllBookingsPage);
