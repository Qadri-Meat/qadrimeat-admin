import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles, Avatar, Box } from '@material-ui/core';
import OrderPageRightPanels from 'components/extra/OrderPageRightPanels/OrderPageRightPanels';
import { getOrder } from 'state/ducks/order/actions';
import * as types from 'state/ducks/transaction/types';
import MUIDataTable from 'mui-datatables';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  my3: {
    margin: '1.3rem 0',
  },
  mb3: {
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
  card: {
    width: '100%',
  },
}));

const columns = [
  {
    name: 'image',
    label: 'Image',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const image = value.length > 0 ? value[0] : '';
        return (
          <Avatar
            variant="rounded"
            src={image === '' ? '' : process.env.REACT_APP_API_URL + image}
          />
        );
      },
    },
  },
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'quantity',
    label: 'Quantity',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'price',
    label: 'Price',
    options: {
      filter: true,
      sort: false,
    },
  },
];

const OrderPage = (props) => {
  const { history, match } = props;
  const orderId = match.params.id;
  const classes = useStyles();

  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.order);
  const { success } = useSelector((state) => state.transaction);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      dispatch({ type: types.TRANSACTION_RESET });
    } else if (isLoggedIn) {
      dispatch(getOrder(orderId));
    } else {
      history.push('/login');
    }
  }, [history, isLoggedIn, orderId, dispatch, success]);

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            m: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Sub Total</Typography>
            <Typography variant="body1">
              Rs
              {' ' + selectedOrder.totalPrice - selectedOrder.shippingPrice}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Shipping Price</Typography>
            <Typography variant="body1">
              Rs{' ' + selectedOrder.shippingPrice}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="body1">
              Rs{' ' + selectedOrder.totalPrice}
            </Typography>
          </Box>
        </Box>
      );
    },
  };

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Order Details
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {selectedOrder ? (
          <Grid container spacing={3}>
            <Grid container item md={8} spacing={3}>
              <Grid item xs={12}>
                <MUIDataTable
                  title={'Order Items'}
                  data={selectedOrder.orderItems}
                  columns={columns}
                  options={options}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <OrderPageRightPanels />
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrderPage;
