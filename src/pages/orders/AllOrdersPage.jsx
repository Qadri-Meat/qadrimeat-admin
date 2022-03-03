import React, { useDebugValue, useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { getOrders } from 'state/ducks/order/actions';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
const useStyles = makeStyles((theme) => ({
  my3: {
    margin: '1.3rem 0',
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: '.85rem',
  },
  p1: {
    padding: '.85rem',
  },
}));

const columns = [
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
      customBodyRender: (value, tableMeta, updateValue) => {
        return <>{value.firstName + ' ' + value.lastName}</>;
      },
    },
  },
  {
    name: 'deliveryTime',
    label: 'Delivery Time',
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
    name: 'deliveredAt',
    label: 'Delivered',
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
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <>{value ? <CheckIcon /> : <ClearIcon />}</>;
      },
    },
  },
];

const AllOrdersPage = (props) => {
  const { history } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const { results, page, totalResults } = useSelector((state) => state.order);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getOrders(selectedPage, limit, search));
    } else {
      history.push('/login');
    }
  }, [history, isLoggedIn, dispatch, selectedPage]);

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    count: totalResults,
    page: page,
    serverSide: true,
    onRowClick: (rowData, rowState) => {
      console.log(rowState.rowIndex);
      history.push(`/orders/${results[rowState.rowIndex].id}`);
    },
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          setSelectedPage(tableState.page + 1);
          break;
        case 'changeRowsPerPage':
          setLimit(tableState.rowsPerPage);
          setSelectedPage(1);
          break;
        case 'search':
          break;
        default:
          break;
      }
    },
  };

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Orders
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={'Orders List'}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllOrdersPage;
