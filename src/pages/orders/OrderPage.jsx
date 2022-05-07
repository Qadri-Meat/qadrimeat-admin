import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import {
  Typography,
  Grid,
  makeStyles,
  Avatar,
  Box,
  Button,
} from '@material-ui/core';
import OrderPageRightPanels from 'components/extra/OrderPageRightPanels/OrderPageRightPanels';
import { getOrder } from 'state/ducks/order/actions';

import MUIDataTable from 'mui-datatables';
import { getDiscountPrice } from 'helpers/product';

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
    name: 'price',
    label: 'Price',
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const { rowData: cartItem } = tableMeta;
        const price = cartItem[2];
        const discount = cartItem[3];
        const discountedPrice = getDiscountPrice(price, discount);
        const finalProductPrice = (price * 1).toFixed(2);
        const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);

        return (
          <>
            {discountedPrice !== null ? (
              <>
                <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                  {'PKR ' + finalProductPrice}
                </span>
                <span className="amount">
                  {'    PKR ' + finalDiscountedPrice}
                </span>
              </>
            ) : (
              <span>{'PKR ' + finalProductPrice}</span>
            )}
          </>
        );
      },
    },
  },
  {
    name: 'discount',
    label: 'Discount',
    options: {
      filter: true,
      sort: false,
      display: false,
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
    label: 'Sub Total',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const { rowData: cartItem } = tableMeta;
        const price = cartItem[2];
        const discount = cartItem[3];
        const quantity = cartItem[4];
        const discountedPrice = getDiscountPrice(price, discount);
        const finalProductPrice = (price * 1).toFixed(2);
        const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
        return (
          <>
            {discountedPrice !== null
              ? 'PKR ' + (finalDiscountedPrice * quantity).toFixed(2)
              : 'PKR ' + (finalProductPrice * quantity).toFixed(2)}
          </>
        );
      },
    },
  },
];

const OrderPage = (props) => {
  const { history, match } = props;
  const orderId = match.params.id;
  const classes = useStyles();

  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.order);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      dispatch(getOrder(orderId));
    } else {
      history.push('/login');
    }
  }, [history, authUser, orderId, dispatch]);

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
        <Grid item>
          {selectedOrder && selectedOrder.type === 'retail' ? (
            <Button
              onClick={() =>
                history.push(`/orders/update-order/${selectedOrder.id}`)
              }
              variant="outlined"
              color="primary"
              size="small"
            >
              Update Order
            </Button>
          ) : (
            <></>
          )}
          <Button
            onClick={() => history.push(`/orders/invoice/${selectedOrder.id}`)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Invoice
          </Button>

          <Button
            onClick={() => history.push(`/orders/receipt/${selectedOrder.id}`)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Receipt
          </Button>
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
