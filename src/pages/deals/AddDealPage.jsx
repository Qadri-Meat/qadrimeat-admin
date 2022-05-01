import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'state/ducks/deal/types';
import DealForm from './components/DealForm';

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

const AddDealPage = (props) => {
  const { history } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.deal);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(authUser);
    if (authUser) {
      if (success) {
        dispatch({ type: types.DEAL_RESET });
        history.push('/deals');
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, authUser]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Add New Deal
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        <DealForm />
      </div>
    </AdminLayout>
  );
};

export default AddDealPage;
