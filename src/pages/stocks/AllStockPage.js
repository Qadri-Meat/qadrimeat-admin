import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import DataTable from '@core/components/ui/DataTable';
import { Button, Grid, Typography } from '@mui/material';
import withAuth from 'hooks/withAuth';
import OrdersFilter from 'pages/orders/components/OrdersFilter';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteStock, getStocks, resetStock } from 'store/stock';

const AllStocksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [showEditDetails, setShowEditDetails] = useState(false);

  const { results, totalResults, success, loading } = useSelector(
    (state) => state.stock
  );
  const handleResetFilter = () => {
    setQuery('');
    navigate('/stocks');
  };

  useEffect(() => {
    if (success) {
      dispatch(resetStock());
    } else {
      dispatch(getStocks(query));
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
            <Grid>
              <Button
                style={{ paddingRight: '10px' }}
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setShowEditDetails(true);
                }}
              >
                Filters
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          loading={loading}
          title={'Stock List'}
          columns={columns}
          results={results}
          totalResults={totalResults}
          setQuery={setQuery}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </AdminLayout>
      <OrdersFilter
        handleResetFilter={handleResetFilter}
        show={showEditDetails}
        setShow={setShowEditDetails}
        setQuery={setQuery}
      />
    </>
  );
};

export default withAuth(AllStocksPage);
