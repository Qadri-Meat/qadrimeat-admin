import React, { useEffect, useState } from 'react';
import AdminLayout from '@core/components/admin/AdminLayout/AdminLayout';
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from 'hooks/withAuth';
import {
  addAllToCart,
  removeItem,
  resetCart,
  updateQuantity,
} from 'store/cart';
import { getOrder, updateOrder } from 'store/order';
import { getProducts } from 'store/product';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@core/components/ui/Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import { getDiscountPrice } from 'helper/product';
import ProductsGrid from './components/ProductsGrid';

const UpdateOrderPage = () => {
  let cartTotalPrice = 0;
  let totalPrice = 0;

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState('limit=8');

  const cartItems = useSelector((state) => state.cart);

  const { success, selectedOrder, loading } = useSelector(
    (state) => state.order
  );

  const handleWeightChange = (value, item) => {
    const quantity = (1 / item.weight) * value;
    dispatch(updateQuantity({ id: item.id, quantity }));
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(removeItem(productId));
  };

  const onSubmit = () => {
    const newOrder = {
      orderItems: cartItems,
      totalPrice: cartTotalPrice.toFixed(2),
      discount: 0,
    };
    dispatch(updateOrder({ id, data: newOrder }));
  };

  useEffect(() => {
    dispatch(getProducts(query));
  }, [dispatch, query]);

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      navigate(`/orders/${selectedOrder.id}`);
    } else if (selectedOrder) {
      const { orderItems } = selectedOrder;
      dispatch(resetCart());
      dispatch(addAllToCart(orderItems));
    }
  }, [dispatch, selectedOrder, navigate, success]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Add New Orderup
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={8} spacing={1}>
          <ProductsGrid />
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 700 }}>
            <CardContent>
              {cartItems.length === 0 ? (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" align="center">
                      Cart is empty
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <>
                  {cartItems.map((cartItem, key) => {
                    const discountedPrice = getDiscountPrice(
                      cartItem.price,
                      cartItem.discount
                    );
                    const finalProductPrice =
                      cartItem.price.toFixed(2);
                    const finalDiscountedPrice = discountedPrice
                      ? discountedPrice.toFixed(2)
                      : 0;

                    discountedPrice != null
                      ? (cartTotalPrice +=
                          finalDiscountedPrice * cartItem.quantity)
                      : (cartTotalPrice +=
                          finalProductPrice * cartItem.quantity);

                    totalPrice +=
                      finalProductPrice * cartItem.quantity;
                    return (
                      <Card
                        key={cartItem.id}
                        sx={{
                          padding: '10px',
                          marginTop: '10px',
                        }}
                      >
                        {/* 1st Row: Title and Price */}
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ marginBottom: '10px' }}
                        >
                          <Typography>
                            {cartItem.name} X {cartItem.quantity}
                          </Typography>
                          <Typography variant="subtitle1">
                            {discountedPrice !== null ? (
                              <>
                                <span
                                  style={{
                                    textDecoration: 'line-through',
                                    marginRight: '5px',
                                  }}
                                >
                                  {'PKR' + finalProductPrice}
                                </span>
                                <span className="amount">
                                  {'PKR' + finalDiscountedPrice}
                                </span>
                              </>
                            ) : (
                              <span className="amount">
                                {'PKR' + finalProductPrice}
                              </span>
                            )}
                          </Typography>
                        </Grid>

                        {/* 2nd Row: Weight Field and Delete Button */}
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <TextField
                            type="number"
                            label="Weight"
                            size="small"
                            value={
                              cartItem.weight * cartItem.quantity ===
                              0
                                ? ''
                                : cartItem.weight * cartItem.quantity
                            }
                            onChange={(e) =>
                              handleWeightChange(
                                e.target.value,
                                cartItem
                              )
                            }
                            inputProps={{
                              pattern: '^[0-9]+([.][0-9]{1,2})?$',
                            }}
                            onInput={(e) => {
                              e.preventDefault();
                              const input = e.target.value.replace(
                                /[^0-9.]/g,
                                ''
                              );
                              if (
                                input !== '' &&
                                parseFloat(input) < 0
                              ) {
                                return;
                              }
                              e.target.value = input;
                            }}
                          />

                          <IconButton
                            onClick={() =>
                              handleRemoveFromCart(cartItem.id)
                            }
                            aria-label="delete"
                          >
                            <DeleteIcon style={{ color: 'red' }} />
                          </IconButton>
                        </Grid>
                      </Card>
                    );
                  })}
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">
                      {' '}
                      Total Items:
                    </Typography>
                    <Typography variant="subtitle1">
                      {cartItems.length}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">
                      {' '}
                      Subtotal:
                    </Typography>
                    <Typography variant="subtitle1">
                      PKR: {cartTotalPrice.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">
                      Discount:
                    </Typography>
                    <Typography variant="subtitle1">
                      PKR: {totalPrice - cartTotalPrice}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">
                      Payable Amount:
                    </Typography>
                    <Typography variant="subtitle1">
                      PKR: {cartTotalPrice.toFixed(2)}
                    </Typography>
                  </Grid>{' '}
                  {/* Proceed button */}
                  <Grid
                    container
                    justifyContent="center"
                    sx={{ marginTop: 3 }}
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <Button
                        onClick={onSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={cartTotalPrice.toFixed(2) < 1}
                      >
                        Proceed
                      </Button>
                    )}
                  </Grid>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};
export default withAuth(UpdateOrderPage);
