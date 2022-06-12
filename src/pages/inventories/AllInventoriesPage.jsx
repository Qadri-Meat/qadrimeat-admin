import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import {
  getInventories,
  deleteInventory,
} from 'state/ducks/inventories/actions';
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

const AllInventoriesPage = (props) => {
  const { history, location } = props;
  const { category = 'chicken', type = 'order' } = pick(location.search);
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // const [search, setSearch] = useState('');
  const { results, page, totalResults } = useSelector(
    (state) => state.inventories
  );

  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      const query = `?page=${selectedPage}&limit=${limit}&category=${category}&type=${type}`;
      dispatch(getInventories(query));
    } else {
      history.push('/login');
    }
  }, [history, authUser, dispatch, selectedPage, limit, category, type]);

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
      name: type === 'order' ? 'weight' : 'quantity',
      label: type === 'order' ? 'Weight (Kg)' : 'Quantity',
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

  const options = {
    filterType: 'checkbox',
    count: totalResults,
    page: page,
    serverSide: true,
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach((row) => {
        dispatch(deleteInventory(results[row.dataIndex].id));
      });
    },
    onRowClick: (rowData, rowState) => {
      history.push(`/inventories/${rowData[0]}`);
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
            Inventories
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
              onClick={() => history.push('/inventories/add-inventory')}
              variant="outlined"
              color="primary"
              size="small"
            >
              Add Inventory
            </Button>
          </Grid>

          <Grid item>
            <ToggleButtonGroup
              color="primary"
              value={category}
              style={{ marginRight: '10px' }}
              size="small"
              exclusive
              onChange={(event, value) => {
                history.push(`/inventories?category=${value}`);
              }}
            >
              <ToggleButton value="chicken">Chicken</ToggleButton>
              <ToggleButton value="mutton">Mutton</ToggleButton>
              <ToggleButton value="beef">Beef</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              color="primary"
              value={type}
              size="small"
              exclusive
              onChange={(event, value) => {
                history.push(
                  `/inventories?category=${category}&type=${
                    value !== undefined && value !== null
                      ? `${value}`
                      : `${type}`
                  }`
                );
              }}
            >
              <ToggleButton value="order">Order</ToggleButton>
              <ToggleButton value="booking">Booking</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={'Inventories List'}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllInventoriesPage;
