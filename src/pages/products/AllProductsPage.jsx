import React, { useEffect, useState } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  Avatar,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { getProducts, deleteProduct } from 'state/ducks/product/actions';
import { useDispatch, useSelector } from 'react-redux';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
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
      display: false,
    },
  },
  {
    name: 'image',
    label: 'Image',
    options: {
      filter: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const image = value.length > 0 ? value[0] : '';
        return (
          <Avatar
            variant="rounded"
            src={image === '' ? '' : process.env.REACT_APP_API_URL + image}
          />
        );
      },
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
  {
    name: 'sku',
    label: 'SKU',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'price',
    label: 'Price',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'stock',
    label: 'Stock',
    options: {
      filter: true,
      sort: false,
    },
  },
];

const AllProductsPage = (props) => {
  const { history } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const { results, page, totalResults } = useSelector((state) => state.product);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts(selectedPage, limit, search));
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
        dispatch(deleteProduct(results[row.dataIndex].id));
      });
    },
    onRowClick: (rowData, rowState) => {
      history.push(`/products/${rowData[0]}`);
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
            Products
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => history.push('/products/add-product')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={'Products List'}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllProductsPage;
