import React, { useEffect } from 'react';
import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import { Grid, Typography } from '@mui/material';
import withAuth from 'hooks/withAuth';
import { useParams } from 'react-router-dom';
import ProductsGrid from './components/ProductsGrid';
import CartView from './components/CartView';
import { getOrder } from 'store/order';
import { useDispatch } from 'react-redux';

const AddOrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== 'add') {
      // TODO: get order by id
      dispatch(getOrder(id));
      console.log(dispatch(getOrder(id)));
    }
  });

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Add New Order
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <ProductsGrid />
        </Grid>
        <Grid item xs={4}>
          <CartView id={id} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
export default withAuth(AddOrderPage);
