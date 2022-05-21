import React, { useEffect } from 'react';
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
    name: 'inventory',
    label: 'Inventory',
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
  // const [search, setSearch] = useState('');
  const { results } = useSelector((state) => state.product);

  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      dispatch(getProducts(1, 100));
    } else {
      history.push('/login');
    }
  }, [history, authUser, dispatch]);

  const options = {
    filterType: 'checkbox',
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach((row) => {
        dispatch(deleteProduct(results[row.dataIndex].id));
      });
    },
    onRowClick: (rowData, rowState) => {
      let product = results.find((o) => o.id === rowData[0]);
      history.push(`/products/${product.id}`);
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
