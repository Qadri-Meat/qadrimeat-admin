import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import FileOpenIcon from '@mui/icons-material/FileOpenOutlined';
import { useLocation } from 'react-router-dom';
import { pick } from 'helper/pick';
import withAuth from 'hooks/withAuth';
import { deleteOrder, getOrders, resetOrder } from 'store/order';
import Loader from '@core/components/ui/Loader';
const AllOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { paid } = pick(location.search);
  const [query, setQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const { results, totalResults, success, loading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    if (success) {
      dispatch(resetOrder());
    } else {
      dispatch(getOrders(query));
    }
  }, [dispatch, paid, query, success]);

  const onDelete = (value) => {
    dispatch(deleteOrder(value));
  };
  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    // navigate(`/bookings?year=${year}`);
  };
  const handlePaidToggle = (event, value) => {
    // navigate(`/bookings?paid=${value}`);
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
          justifyContent="space-between"
          alignItems="center"
          xs={10}
        >
          <Grid item>
            <Button
              onClick={() => navigate('/orders/add-order')}
              variant="outlined"
              color="primary"
              size="small"
            >
              Add Order
            </Button>
          </Grid>
          <Grid sx={{ marginLeft: '450px' }} item>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
              <InputLabel id="demo-simple-select-label">
                Year
              </InputLabel>
              <Select
                label="Year"
                onChange={handleYearChange}
                variant="outlined"
              >
                <MenuItem value={'2022'}>2022</MenuItem>
                <MenuItem value={'2023'}>2023</MenuItem>
              </Select>
            </FormControl>
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
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <DataTable
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
