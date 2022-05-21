import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getStock } from 'state/ducks/stocks/actions';
import * as types from 'state/ducks/stocks/types';
import StockForm from './components/StockForm';

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

const AddStockPage = (props) => {
  const { history, match } = props;
  const stockId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, stock } = useSelector((state) => state.stocks);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: types.STOCK_RESET });
        history.push('/stocks');
      } else if (stockId) {
        dispatch(getStock(stockId));
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, authUser, stockId]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            {stockId ? 'Update Stock' : 'Add Stock'}
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {stockId ? (
          <StockForm preloadedValues={stock} key={stock} />
        ) : (
          <StockForm />
        )}
      </div>
    </AdminLayout>
  );
};

export default AddStockPage;
