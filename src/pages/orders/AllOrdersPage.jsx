import React, { useEffect, useState } from 'react';
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
    name: 'id',
    label: 'Id',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'shippingDetails',
    label: 'Name',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <>{value.name}</>;
      },
    },
  },
  {
    name: 'createdAt',
    label: 'Date',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <>{value.substring(0, 10)}</>;
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
    name: 'isPaid',
    label: 'Paid',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <>{value === true ? <CheckIcon /> : <ClearIcon />}</>;
      },
    },
  },
  {
    name: 'isDelivered',
    label: 'Delivered',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <>{value === true ? <CheckIcon /> : <ClearIcon />}</>;
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
      history.push(`/orders/${rowData[0]}`);
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
