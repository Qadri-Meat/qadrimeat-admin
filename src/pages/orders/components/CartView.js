import Loader from '@core/components/ui/Loader';
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { getDiscountPrice } from 'helper/product';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addAllToCart,
  removeItem,
  resetCart,
  updateQuantity,
} from 'store/cart';
import DeleteIcon from '@mui/icons-material/Delete';
import { createOrder, updateOrder } from 'store/order';
import { toast } from 'react-toastify';

const CartView = ({ id }) => {
  let cartTotalPrice = 0;
  let totalPrice = 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const { success, selectedOrder, loading } = useSelector(
    (state) => state.order
  );

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItem(productId));
  };
  console.log(selectedOrder);

  const handleWeightChange = (value, item) => {
    const quantity = (1 / item.weight) * value;
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  const onSubmit = () => {
    console.log(cartItems, 'in card submit');
    console.log(id);
    if (cartItems && cartItems.length > 0) {
      if (id !== 'add') {
        const newOrder = {
          orderItems: cartItems,
          totalPrice: cartTotalPrice.toFixed(2),
          discount: 0,
        };
        dispatch(updateOrder({ id, data: newOrder }));
      } else {
        const orderItems = cartItems.map((item) => {
          const i = { ...item };
          if (id === 'add') delete i.id;
          return i;
        });
        const newOrder = {
          orderItems,
          totalPrice: cartTotalPrice.toFixed(2),
          discount: 0,
          deliveryTime: Date.now(),
          type: 'retail',
        };
        console.log(newOrder);
        dispatch(createOrder(newOrder));
      }
    } else {
      toast.error('Cart is empty');
    }
  };

  useEffect(() => {
    if (success) {
      navigate(`/orders/details/${selectedOrder.id}`);
    } else if (selectedOrder) {
      const { orderItems } = selectedOrder;
      dispatch(resetCart());
      dispatch(addAllToCart(orderItems));
    }
  }, [success, dispatch, navigate, selectedOrder]);
  return (
    <Card sx={{ maxWidth: 500 }}>
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
            <div
              style={{
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {cartItems.map((cartItem, key) => {
                const discountedPrice = getDiscountPrice(
                  cartItem.price,
                  cartItem.discount
                );
                const finalProductPrice = cartItem.price.toFixed(2);
                const finalDiscountedPrice = discountedPrice
                  ? discountedPrice.toFixed(2)
                  : 0;

                discountedPrice != null
                  ? (cartTotalPrice +=
                      finalDiscountedPrice * cartItem.quantity)
                  : (cartTotalPrice +=
                      finalProductPrice * cartItem.quantity);

                totalPrice += finalProductPrice * cartItem.quantity;
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
                          cartItem.weight * cartItem.quantity === 0
                            ? ''
                            : cartItem.weight * cartItem.quantity
                        }
                        onChange={(e) =>
                          handleWeightChange(e.target.value, cartItem)
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
                          if (input !== '' && parseFloat(input) < 0) {
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
            </div>
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
              <Typography variant="subtitle1"> Subtotal:</Typography>
              <Typography variant="subtitle1">
                PKR: {totalPrice}
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
              <Typography variant="subtitle1">Discount:</Typography>
              <Typography variant="subtitle1">
                PKR: {(totalPrice - cartTotalPrice).toFixed(2)}
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
                  {id === 'add' ? 'Create' : 'Update'}
                </Button>
              )}
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CartView;
