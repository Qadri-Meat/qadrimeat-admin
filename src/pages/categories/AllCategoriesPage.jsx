import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { getCategories, deleteCategory } from 'state/ducks/category/actions';
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
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: false,
    },
  },
];

const AllCategoriesPage = (props) => {
  const { history } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const { results, page, totalResults } = useSelector(
    (state) => state.category
  );

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCategories(selectedPage, limit, search));
    } else {
      history.push('/login');
    }
  }, [history, isLoggedIn, dispatch, selectedPage]);

  const options = {
    filterType: 'checkbox',
    count: totalResults,
    page: page,
    serverSide: true,
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach((row) => {
        dispatch(deleteCategory(results[row.dataIndex].id));
      });
    },
    onRowClick: (rowData, rowState) => {
      history.push(`/categories/${rowData[0]}`);
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
            Categories
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => history.push('/categories/add-category')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Category
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={'Categories List'}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllCategoriesPage;
