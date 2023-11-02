import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import FileOpenIcon from '@mui/icons-material/FileOpenOutlined';
import { useNavigate } from 'react-router-dom';
import withAuth from 'hooks/withAuth';
import { deleteOrder, getOrders, resetOrder } from 'store/order';
import Loader from '@core/components/ui/Loader';
import CustomFilter from './components/CustomFilter';

const AllOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [paid, setPaid] = useState('');
  const [orderType, setOrderType] = useState('');

  const { results, totalResults, success, loading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (success) {
      dispatch(resetOrder());
    } else {
      let url = '';
      if (paid) {
        url += `isPaid=${paid}`;
      }
      if (orderType) {
        url += `type=${orderType}`;
      }

      if (orderType && paid) {
        if (url) {
          url = '';
        }
        url += `isPaid=${paid}&type=${orderType}`;
      }
      if (query) {
        if (url) {
          url += '&';
        }
        url += query;
      }

      dispatch(getOrders(url));
    }
  }, [dispatch, paid, query, success, orderType]);

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
            <Button href={`/orders/${values}`}>
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
      name: 'approvedAt',
      label: 'Approved',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },

    {
      name: 'isPaid',
      label: 'Paid',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value ? <CheckIcon /> : <ClearIcon />}</>;
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
                onClick={() => navigate('/orders/add-order')}
                variant="outlined"
                color="primary"
                size="small"
              >
                Add Order
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
        {loading ? (
          <Loader />
        ) : (
          <DataTable
            loading={loading}
            title={'Order List'}
            results={results}
            totalResults={totalResults}
            columns={columns}
            setQuery={setQuery}
            onDelete={onDelete}
            searchPlaceholder="Search by name or phone number"
          />
        )}
      </AdminLayout>
      <CustomFilter
        setPaid={setPaid}
        paid={paid}
        show={showEditDetails}
        setShow={setShowEditDetails}
        setQuery={setQuery}
        setOrderType={setOrderType}
        orderType={orderType}
      />
    </>
  );
};

export default withAuth(AllOrderPage);
