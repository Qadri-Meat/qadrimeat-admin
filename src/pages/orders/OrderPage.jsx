import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import {
  Typography,
  Grid,
  makeStyles,
  Avatar,
  Card,
  CardContent,
} from '@material-ui/core';
import OrderPageRightPanels from 'components/extra/OrderPageRightPanels/OrderPageRightPanels';
import { getOrder } from 'state/ducks/order/actions';

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
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (!selectedOrder || selectedOrder.id !== orderId) {
        dispatch(getOrder(orderId));
      }
    } else {
      history.push('/login');
    }
  }, [history, isLoggedIn, selectedOrder, orderId, dispatch]);

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
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
            <Grid container item xs={12} md={8}>
              <Grid item xs={12}>
                <MUIDataTable
                  title={'Order Items'}
                  data={selectedOrder.orderItems}
                  columns={columns}
                  options={options}
                />
              </Grid>
              <Grid container item justify="space-between">
                <Grid item xs={3}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Sub Total
                      </Typography>
                      <Typography gutterBottom variant="body1" component="div">
                        {selectedOrder.currency}
                        {selectedOrder.totalPrice}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Shipping Price
                      </Typography>
                      <Typography gutterBottom variant="body1" component="div">
                        {selectedOrder.currency}
                        {selectedOrder.shippingPrice}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        Grand Total
                      </Typography>
                      <Typography gutterBottom variant="body1" component="div">
                        {selectedOrder.currency}
                        {selectedOrder.totalPrice - selectedOrder.shippingPrice}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
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
