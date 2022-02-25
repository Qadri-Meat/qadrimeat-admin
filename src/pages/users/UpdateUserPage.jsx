import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useData } from 'context/DataContext';
import { getUser } from 'state/ducks/user/actions';
import * as types from 'state/ducks/user/types';
import UserForm from './components/UserForm';

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

const UpdateUserPage = (props) => {
  const { history, match } = props;
  const userId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { setValues, data } = useData();

  const { success, selectedUser } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      if (success) {
        dispatch({ type: types.USER_RESET });
        history.push('/users');
      } else {
        if (!selectedUser) {
          dispatch(getUser(userId));
        } else {
          setValues(selectedUser);
        }
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, isLoggedIn, userId, selectedUser]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Update User
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {data.id ? <UserForm preloadedValues={data} /> : <></>}
      </div>
    </AdminLayout>
  );
};

export default UpdateUserPage;
