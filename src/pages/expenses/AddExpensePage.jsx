import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getExpense } from 'state/ducks/expenses/actions';
import * as types from 'state/ducks/expenses/types';
import ExpenseForm from './components/ExpenseForm';

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

const AddExpensePage = (props) => {
  const { history, match } = props;
  const expenseId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const { success, expense } = useSelector((state) => state.expenses);
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: types.EXPENSE_RESET });
        history.push('/expenses');
      } else if (expenseId) {
        dispatch(getExpense(expenseId));
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, success, authUser, expenseId]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            {expenseId ? 'Update Expense' : 'Add Expense'}
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <div className={classes.root}>
        {expenseId ? (
          <ExpenseForm preloadedValues={expense} key={expense} />
        ) : (
          <ExpenseForm />
        )}
      </div>
    </AdminLayout>
  );
};

export default AddExpensePage;
