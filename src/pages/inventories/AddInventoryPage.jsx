import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getInventory } from 'state/ducks/inventories/actions';
import * as types from 'state/ducks/inventories/types';
import InventoryForm from './components/InventoryForm';

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

const AddInventoryPage = (props) => {
  const { history, match } = props;
  const inventoryId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, inventory } = useSelector((state) => state.inventories);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: types.INVENTORY_RESET });
        history.push('/inventories');
      } else if (inventoryId) {
        dispatch(getInventory(inventoryId));
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, authUser, inventoryId]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            {inventoryId ? 'Update Inventory' : 'Add Inventory'}
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {inventoryId ? (
          <InventoryForm preloadedValues={inventory} key={inventory} />
        ) : (
          <InventoryForm />
        )}
      </div>
    </AdminLayout>
  );
};

export default AddInventoryPage;
