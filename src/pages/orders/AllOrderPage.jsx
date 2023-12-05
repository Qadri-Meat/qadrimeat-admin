import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileOpenIcon from '@mui/icons-material/FileOpenOutlined';
import { useNavigate } from 'react-router-dom';
import withAuth from 'hooks/withAuth';
import { deleteOrder, getOrders, resetOrder } from 'store/order';
import Loader from '@core/components/ui/Loader';
import { numberWithCommas } from 'helper/numers';
import { buildURLQuery } from '@core/utils/buildURLQuery';

const AllOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPaymentStatusFilter, setShowPaymentStatusFilter] =
    useState(true);
  const [showOrderTypeFilter, setShowOrderTypeFilter] =
    useState(true);
  console.log(setShowPaymentStatusFilter, setShowOrderTypeFilter);

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { results, totalResults, loading, success } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (success) {
      dispatch(resetOrder());
    } else {
      dispatch(getOrders(buildURLQuery(query)));
    }
  }, [dispatch, query, success]);

  const onDelete = (value) => {
    dispatch(deleteOrder(value));
  };

  const columns = [
    {
      name: 'id',
      label: 'View',
      options: {
        filter: false,
        customBodyRender: (values, tableMeta, updateValue) => {
          return (
            <Button href={`/orders/details/${values}`}>
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
          return (
            <>
              {(values?.firstName || '-') +
                ' ' +
                (values?.lastName || '')}
            </>
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
      name: 'type',
      label: 'Source',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'totalPrice',
      label: 'TOTAL',
      options: {
        filter: true,
        sort: false,
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
        {loading && <Loader />}
        <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              Orders
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
                onClick={() => navigate('/orders/add')}
                variant="outlined"
                color="primary"
                size="small"
              >
                Add Order
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          showPaymentStatusFilter={showPaymentStatusFilter}
          showOrderTypeFilter={showOrderTypeFilter}
          loading={loading}
          title={'Order List'}
          results={results}
          totalResults={totalResults}
          columns={columns}
          query={query}
          setQuery={setQuery}
          onDelete={onDelete}
          searchPlaceholder="Search by name or phone number"
        />
      </AdminLayout>
    </>
  );
};

export default withAuth(AllOrderPage);
