import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from 'state/ducks/order/actions';
import * as types from 'state/ducks/order/types';
import OrderForm from './components/OrderForm';
import { ADD_ALL_TO_CART } from 'state/ducks/cart/types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  my3: {
    margin: '1.3rem 0',
  },
  mRight: {
    marginRight: '.85rem',
  },
}));

const UpdateOrderPage = (props) => {
  const { history, match } = props;
  const orderId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, selectedOrder } = useSelector((state) => state.order);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (success) {
        dispatch({ type: types.ORDER_RESET });
        history.push(`/orders/${orderId}`);
      } else if (!selectedOrder) {
        dispatch(getOrder(orderId));
      } else if (selectedOrder) {
        console.log('test', selectedOrder.orderItems);
        dispatch({ type: ADD_ALL_TO_CART, payload: selectedOrder.orderItems });
      }
    } else {
      history.push('/login');
    }
  }, [history, success, isLoggedIn, orderId, selectedOrder, dispatch]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update Order
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {selectedOrder ? <OrderForm preloadedValues={selectedOrder} /> : <></>}
      </div>
    </AdminLayout>
  );
};

export default UpdateOrderPage;
