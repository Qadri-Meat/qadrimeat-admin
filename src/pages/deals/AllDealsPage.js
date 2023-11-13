import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDeal, getDeals, resetDeal } from 'store/deal';
import DataTable from '@core/components/ui/DataTable';
import MemoizedAvatar from '@core/components/extra/MemoizedAvatar';
import withAuth from 'hooks/withAuth';
import { getImageUrl } from 'helper/helpers';
const AllDealsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const { user: authUser } = useSelector((state) => state.auth);
  const { results, totalResults, success, loading } = useSelector(
    (state) => state.deal
  );

  useEffect(() => {
    if (success) {
      dispatch(resetDeal());
    } else {
      dispatch(getDeals(query));
    }
  }, [dispatch, query, success]);

  const onDelete =
    authUser?.role === 'user'
      ? null
      : (value) => {
          dispatch(deleteDeal(value));
        };

  const onEdit =
    authUser?.role === 'user'
      ? null
      : (value) => {
          navigate(`/deals/${value}`);
        };

  const columns = [
    {
      name: 'image',
      label: 'Image',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <MemoizedAvatar src={getImageUrl(value)} />;
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
    {
      name: 'stock',
      label: 'Stock',
    },
  ];

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Deals
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate('/deals/add-deal')}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Deal
          </Button>
        </Grid>
      </Grid>
      <DataTable
        loading={loading}
        title={'Deals List'}
        results={results}
        totalResults={totalResults}
        columns={columns}
        setQuery={setQuery}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </AdminLayout>
  );
};

export default withAuth(AllDealsPage);
