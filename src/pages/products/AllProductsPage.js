import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from '@core/components/ui/DataTable';
import MemoizedAvatar from '@core/components/extra/MemoizedAvatar';
import withAuth from 'hooks/withAuth';
import {
  deleteProduct,
  getProducts,
  resetProduct,
} from 'store/product';
import { getImageUrl } from 'helper/helpers';
import Loader from '@core/components/ui/Loader';
import { buildURLQuery } from '@core/utils/buildURLQuery';
const AllProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const { user: authUser } = useSelector((state) => state.auth);
  const { results, totalResults, success, loading } = useSelector(
    (state) => state.product
  );

  const [showDateFilter, setShowDateFilter] = useState(true);
  console.log(setShowDateFilter);

  useEffect(() => {
    if (success) {
      dispatch(resetProduct());
    } else {
      dispatch(getProducts(buildURLQuery(query)));
    }
  }, [dispatch, query, success]);

  const onDelete =
    authUser?.role === 'user'
      ? null
      : (value) => {
          dispatch(deleteProduct(value));
        };

  const onEdit =
    authUser?.role === 'user'
      ? null
      : (value) => {
          navigate(`/products/${value}`);
        };

  const columns = [
    {
      name: 'image',
      label: 'Image',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <MemoizedAvatar
              src={getImageUrl(
                value.length > 0 ? value[0] : '/default.png'
              )}
            />
          );
        },
      },
    },
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'sku',
      label: 'SKU',
    },
    {
      name: 'price',
      label: 'Price',
    },
  ];

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Products
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate('/products/add-products')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <DataTable
          showDateFilter={showDateFilter}
          title={'Product List'}
          results={results}
          totalResults={totalResults}
          columns={columns}
          query={query}
          setQuery={setQuery}
          onEdit={onEdit}
          onDelete={onDelete}
          searchPlaceholder="Search by name"
        />
      )}
    </AdminLayout>
  );
};

export default withAuth(AllProductsPage);
