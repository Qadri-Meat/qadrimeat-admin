import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { getExpenses, deleteExpense } from 'state/ducks/expenses/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  my3: {
    margin: '1.3rem 0',
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: '.85rem',
  },
  p1: {
    padding: '.85rem',
  },
}));

const columns = [
  {
    name: 'id',
    label: 'Id',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'description',
    label: 'Description',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'amount',
    label: 'Amount',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'type',
    label: 'Type',
    options: {
      filter: true,
      sort: false,
    },
  },
];

const AllExpensesPage = (props) => {
  const { history } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [search, setSearch] = useState('');
  const { results, page, totalResults } = useSelector(
    (state) => state.expenses
  );

  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      dispatch(getExpenses(selectedPage, limit));
    } else {
      history.push('/login');
    }
  }, [history, authUser, dispatch, selectedPage, limit]);

  const options = {
    filterType: 'checkbox',
    count: totalResults,
    page: page,
    serverSide: true,
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach((row) => {
        dispatch(deleteExpense(results[row.dataIndex].id));
      });
    },
    onRowClick: (rowData, rowState) => {
      history.push(`/expenses/${rowData[0]}`);
    },
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          setSelectedPage(tableState.page + 1);
          break;
        case 'changeRowsPerPage':
          setLimit(tableState.rowsPerPage);
          setSelectedPage(1);
          break;
        case 'search':
          break;
        default:
          break;
      }
    },
  };

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
          <Typography variant="h5" component="h1">
            Expenses
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => history.push('/expenses/add-expense')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Expense
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={'Expenses List'}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllExpensesPage;
