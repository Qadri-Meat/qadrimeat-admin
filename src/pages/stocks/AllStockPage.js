import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import { buildURLQuery } from '@core/utils/buildURLQuery';
import { Button, Grid, Typography } from '@mui/material';
import withAuth from 'hooks/withAuth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteStock, getStocks, resetStock } from 'store/stock';

const AllStocksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  const [showPaymentStatusFilter, setShowPaymentStatusFilter] =
    useState(false);
  const [showOrderTypeFilter, setShowOrderTypeFilter] =
    useState(false);
  console.log(setShowPaymentStatusFilter, setShowOrderTypeFilter);

  const { results, totalResults, success, loading } = useSelector(
    (state) => state.stock
  );

  useEffect(() => {
    if (success) {
      dispatch(resetStock());
    } else {
      dispatch(getStocks(buildURLQuery(query)));
    }
  }, [success, dispatch, query]);

  const onDelete = (value) => {
    dispatch(deleteStock(value));
  };

  const onEdit = (value) => {
    navigate(`/stock/${value}`);
  };

  const columns = [
    {
      name: 'id',
      label: 'Id',
    },
    {
      name: 'category',
      label: 'Category',
    },
    {
      name: 'weight',
      label: 'Weight',
    },
    {
      name: 'price',
      label: 'Amount(per KG)',
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
              Stocks
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
                onClick={() => navigate('/stock/add-stock')}
                variant="outlined"
                color="primary"
                size="small"
              >
                Add Stock
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          showPaymentStatusFilter={showPaymentStatusFilter}
          showOrderTypeFilter={showOrderTypeFilter}
          loading={loading}
          title={'Stock List'}
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

export default withAuth(AllStocksPage);
