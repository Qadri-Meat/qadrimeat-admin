import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from 'state/ducks/product/actions';
import * as types from 'state/ducks/product/types';
import ProductForm from './components/ProductForm';

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

const UpdateProductPage = (props) => {
  const { history, match } = props;
  const productId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, selectedProduct } = useSelector((state) => state.product);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: types.PRODUCT_RESET });
        history.push('/products');
      } else if (!selectedProduct) {
        dispatch(getProduct(productId));
      }
    } else {
      history.push('/login');
    }
  }, [history, success, authUser, productId, selectedProduct, dispatch]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update Product
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {selectedProduct ? (
          <ProductForm preloadedValues={selectedProduct} />
        ) : (
          <></>
        )}
      </div>
    </AdminLayout>
  );
};

export default UpdateProductPage;
