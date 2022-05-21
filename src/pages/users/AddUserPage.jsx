import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as types from 'state/ducks/user/types';
import UserForm from './components/UserForm';
import { getUser } from 'state/ducks/user/actions';

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

const AddUserPage = (props) => {
  const { history, match } = props;
  const userId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, user } = useSelector((state) => state.user);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: types.USER_RESET });
        history.push('/users');
      } else if (userId) {
        dispatch(getUser(userId));
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, authUser, userId]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            {userId ? 'Update User' : 'Add New User'}
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {userId ? <UserForm preloadedValues={user} key={user} /> : <UserForm />}
      </div>
    </AdminLayout>
  );
};

export default AddUserPage;
