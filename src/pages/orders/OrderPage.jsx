import AdminBreadcrumbs from '@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs';
import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { getDiscountPrice } from 'helper/product';
import MemoizedAvatar from '@core/components/extra/MemoizedAvatar';
import { getOrder } from 'store/order';
import OrderPageRightPanels from '@core/components/extra/OrderPageRightPanels/OrderPageRightPanels';
import { getImageUrl } from 'helper/helpers';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state) => state.order);
  const items = selectedOrder?.orderItems || [];
  let totalPriceWithoutDiscount = 0;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id, navigate]);

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
      options: {
        filter: true,
        sort: true,
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
      name: 'discount',
      label: 'Discount',
      options: {
        filter: true,
        sort: false,
        display: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData: cartItem } = tableMeta;
          const price = cartItem[2];
          const discount = cartItem[3];
          const discountedPrice = getDiscountPrice(price, discount);
          const finalProductPrice = (price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(
            2
          );

          return (
            <>
              {discountedPrice !== null ? (
                <>
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: 'gray',
                    }}
                  >
                    {'PKR ' + finalProductPrice}
                  </span>
                  <br />
                  <span className="amount">
                    {'    PKR ' + finalDiscountedPrice}
                  </span>
                </>
              ) : (
                <span>{'PKR ' + finalProductPrice}</span>
              )}
            </>
          );
        },
      },
    },
    {
      name: 'quantity',
      label: 'Quantity',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'weight',
      label: 'Weight',
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: 'price',
      label: 'Sub Total',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData: cartItem } = tableMeta;
          const price = cartItem[2];
          const discount = cartItem[3];
          const quantity = cartItem[4];
          const discountedPrice = getDiscountPrice(price, discount);
          const finalProductPrice = (price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(
            2
          );
          return (
            <>
              {discountedPrice !== null
                ? 'PKR ' +
                  (finalDiscountedPrice * quantity).toFixed(2)
                : 'PKR ' + (finalProductPrice * quantity).toFixed(2)}
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    selectableRows: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    customFooter: (
      count,
      page,
      rowsPerPage,
      changeRowsPerPage,
      changePage
    ) => {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            m: 3,
          }}
        >
          {items.forEach((item) => {
            totalPriceWithoutDiscount += item.price;
          })}
          <Box>
            <Typography variant="h6">Sub Total</Typography>
            <Typography variant="body1">
              Rs
              {' ' + totalPriceWithoutDiscount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Shipping Price</Typography>
            <Typography variant="body1">
              Rs{' ' + selectedOrder.shippingPrice}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Discount</Typography>
            <Typography variant="body1">
              Rs
              {' ' +
                (
                  totalPriceWithoutDiscount - selectedOrder.totalPrice
                ).toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="body1">
              Rs{' ' + selectedOrder.totalPrice}
            </Typography>
          </Box>
        </Box>
      );
    },
  };

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Orders Details
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate(`/orders/update-order/${id}`)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Update Order
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              window.open(`/orders/invoice/${id}`, '_blank');
            }}
            variant="outlined"
            color="primary"
            size="small"
          >
            Invoice
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      {selectedOrder ? (
        <Grid container spacing={3}>
          <Grid container item md={8} spacing={3}>
            <Grid item xs={12}>
              <MUIDataTable
                title={'Order Items'}
                data={selectedOrder.orderItems}
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderPageRightPanels />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </AdminLayout>
  );
};

export default OrderPage;
