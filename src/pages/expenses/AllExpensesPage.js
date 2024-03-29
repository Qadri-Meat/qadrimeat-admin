import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import { buildURLQuery } from '@core/utils/buildURLQuery';
import { Button, Grid, Typography } from '@mui/material';
import withAuth from 'hooks/withAuth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteExpense,
  getExpenses,
  resetExpense,
} from 'store/expense';

const AllExpensesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [showPaymentStatusFilter, setShowPaymentStatusFilter] =
    useState(false);
  const [showOrderTypeFilter, setShowOrderTypeFilter] =
    useState(false);
  console.log(setShowPaymentStatusFilter, setShowOrderTypeFilter);
  const { results, totalResults, success, loading } = useSelector(
    (state) => state.expense
  );

  useEffect(() => {
    if (success) {
      dispatch(resetExpense());
    } else {
      dispatch(getExpenses(buildURLQuery(query)));
    }
  }, [success, dispatch, query]);

  const onDelete = (value) => {
    dispatch(deleteExpense(value));
  };

  const onEdit = (value) => {
    navigate(`/expenses/${value}`);
  };

  const columns = [
    {
      name: 'id',
      label: 'Id',
    },
    {
      name: 'description',
      label: 'Description',
    },
    {
      name: 'amount',
      label: 'Amount',
    },
    {
      name: 'createdAt',
      label: 'Date Added',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {new Date(value).toLocaleDateString()},{' '}
              {new Date(value).toLocaleTimeString()}
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <AdminLayout>
        <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              Expenses
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            xs={10}
          >
            <Grid item>
              <Button
                style={{ marginRight: '10px' }}
                onClick={() => navigate('/expenses/add-expenses')}
                variant="outlined"
                color="primary"
                size="small"
              >
                Add Expense
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          showPaymentStatusFilter={showPaymentStatusFilter}
          showOrderTypeFilter={showOrderTypeFilter}
          loading={loading}
          title={'Expense List'}
          columns={columns}
          results={results}
          totalResults={totalResults}
          query={query}
          setQuery={setQuery}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </AdminLayout>
    </>
  );
};

export default withAuth(AllExpensesPage);
