import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'state/ducks/category/types';
import CategoryForm from './components/CategoryForm';

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

const AddCategoryPage = (props) => {
  const { history } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.category);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (success) {
        dispatch({ type: types.CATEGORY_RESET });
        history.push('/categories');
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, isLoggedIn]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Add New Category
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        <CategoryForm />
      </div>
    </AdminLayout>
  );
};

export default AddCategoryPage;
