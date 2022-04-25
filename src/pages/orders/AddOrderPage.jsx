import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'state/ducks/order/types';
import OrderForm from './components/OrderForm';

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

const AddOrderPage = (props) => {
  const { history } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, selectedOrder } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (success) {
        history.push(`/orders/${selectedOrder.id}`);
        dispatch({ type: types.ORDER_RESET });
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, user, selectedOrder]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Add New Order
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        <OrderForm />
      </div>
    </AdminLayout>
  );
};

export default AddOrderPage;
