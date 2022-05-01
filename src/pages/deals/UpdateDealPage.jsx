import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getDeal } from 'state/ducks/deal/actions';
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

const UpdateDealPage = (props) => {
  const { history, match } = props;
  const dealId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, selectedDeal } = useSelector((state) => state.deal);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: types.DEAL_RESET });
        history.push('/deals');
      } else if (!selectedDeal) {
        dispatch(getDeal(dealId));
      }
    } else {
      history.push('/login');
    }
  }, [history, success, authUser, dealId, selectedDeal, dispatch]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update Deal
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {selectedDeal ? <DealForm preloadedValues={selectedDeal} /> : <></>}
      </div>
    </AdminLayout>
  );
};

export default UpdateDealPage;
