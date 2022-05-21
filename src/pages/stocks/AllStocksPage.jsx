import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { getStocks, deleteStock } from 'state/ducks/stocks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { pick } from 'helpers/pick';

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
    name: 'cost',
    label: 'Cost',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'weight',
    label: 'Weight (Kg)',
    options: {
      filter: true,
      sort: false,
    },
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

const AllStocksPage = (props) => {
  const { history, location } = props;
  const { category = 'chicken' } = pick(location.search);
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [search, setSearch] = useState('');
  const { results, page, totalResults } = useSelector((state) => state.stocks);

  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      const query = `?page=${selectedPage}&limit=${limit}&category=${category}`;
      dispatch(getStocks(query));
    } else {
      history.push('/login');
    }
  }, [history, authUser, dispatch, selectedPage, limit, category]);

  const options = {
    filterType: 'checkbox',
    count: totalResults,
    page: page,
    serverSide: true,
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach((row) => {
        dispatch(deleteStock(results[row.dataIndex].id));
      });
    },
    onRowClick: (rowData, rowState) => {
      history.push(`/stocks/${rowData[0]}`);
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
            Stocks
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          xs={10}
        >
          <Grid item>
            <Button
              onClick={() => history.push('/stocks/add-stock')}
              variant="outlined"
              color="primary"
              size="small"
            >
              Add Stock
            </Button>
          </Grid>

          <Grid item>
            <ToggleButtonGroup
              color="primary"
              value={category}
              size="small"
              exclusive
              onChange={(event, value) => {
                history.push(`/stocks?category=${value}`);
              }}
            >
              <ToggleButton value="chicken">Chicken</ToggleButton>
              <ToggleButton value="mutton">Mutton</ToggleButton>
              <ToggleButton value="beef">Beef</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={'Stocks List'}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllStocksPage;
