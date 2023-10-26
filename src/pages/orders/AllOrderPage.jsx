import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import FileOpenIcon from '@mui/icons-material/FileOpenOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import { pick } from 'helper/pick';
import withAuth from 'hooks/withAuth';
import { deleteOrder, getOrders, resetOrder } from 'store/order';
import Loader from '@core/components/ui/Loader';

const AllOrderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { paid } = pick(location.search);
  const [query, setQuery] = useState('');
  const [orderType, setOrderType] = useState('');

  const { results, totalResults, success, loading } = useSelector(
    (state) => state.order
  );
  const handleResetFilter = (event, value) => {
    setOrderType('');
    setQuery('');
    navigate('/orders');
  };
  const handlePaidToggle = (event, value) => {
    navigate(`/orders?paid=${value}`);
  };
  const handleOrderType = (event, value) => {
    setOrderType(value);
  };

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
          <Grid item>
            <Button
              style={{ marginRight: '10px' }}
              onClick={handleResetFilter}
              variant="outlined"
              color="primary"
              size="small"
            >
              Clear Filter
            </Button>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              color="primary"
              style={{ marginRight: '10px' }}
              value={paid}
              size="small"
              exclusive
              onChange={handlePaidToggle}
            >
              <ToggleButton value="true">Paid</ToggleButton>
              <ToggleButton value="false">UnPaid</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <ToggleButtonGroup
              color="primary"
              style={{ marginRight: '10px' }}
              value={orderType}
              size="small"
              exclusive
              onChange={handleOrderType}
            >
              <ToggleButton value="online">Online</ToggleButton>
              <ToggleButton value="retail">Retail</ToggleButton>
            </ToggleButtonGroup>
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
  );
};

export default withAuth(AllOrderPage);
