import React, { useEffect, useState } from "react";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "hooks/withAuth";
import { addToCart } from "store/cart";
import { createOrder } from "store/order";
import { getProducts } from "store/product";
import { useNavigate } from "react-router-dom";
import Loader from "@core/components/ui/Loader";
import { getImageUrl } from "helper/helpers";
import { getDiscountPrice } from "helper/product";

const AddOrderPage = () => {
  let cartTotalPrice = 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const { results } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart);
  const { success, selectedOrder, loading } = useSelector(
    (state) => state.order
  );

  const handleAddToCart = (product) => {
    const newItem = {
      id: product.id,
      name: product.name,
      quantity: 1,
      weight: product.weight,
      price: product.price,
      discount: 0,
      image: product.image,
      product: product.id,
    };

    dispatch(addToCart(newItem));
  };

  const handleWeightChange = (item) => {
    console.log(item);
  };

  const onSubmit = () => {
    const newOrder = {
      orderItems: cartItems,
      totalPrice: cartTotalPrice.toFixed(2),
      discount: 0,
      deliveryTime: Date.now(),
    };
    dispatch(createOrder(newOrder));
  };

  useEffect(() => {
    if (success) {
      navigate(`/orders/${selectedOrder.id}`);
    } else {
      dispatch(getProducts(query));
    }
  }, [success, dispatch, navigate, selectedOrder, query]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Add New Order
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Grid container spacing={1}>
            {results?.map((product) => (
              <Grid item xs={3} key={product.id}>
                <Card
                  sx={{ maxWidth: 200, cursor: "pointer" }}
                  onClick={() => handleAddToCart(product)}
                >
                  <CardMedia
                    sx={{ height: 100 }}
                    image={getImageUrl(product.image)}
                    title={product.title}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      PKR: {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Card sx={{ maxWidth: 700 }}>
            <CardContent>
              {cartItems.length === 0 ? (
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: "center", alignItems: "center" }}
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
                    const finalProductPrice = cartItem.price.toFixed(2);
                    const finalDiscountedPrice = discountedPrice.toFixed(2);

                    discountedPrice != null
                      ? (cartTotalPrice +=
                          finalDiscountedPrice * cartItem.quantity)
                      : (cartTotalPrice +=
                          finalProductPrice * cartItem.quantity);
                    return (
                      <Card
                        key={key}
                        sx={{
                          display: "flex",
                          padding: "10px",
                          marginTop: "10px",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>
                          {cartItem.name} X {cartItem.quantity}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            type="number"
                            label="Weight"
                            size="small"
                            value={cartItem.weight}
                            sx={{ width: "100px", marginRight: "10px" }}
                            onChange={(e) => handleWeightChange(cartItem)}
                            inputProps={{
                              pattern: "^[0-9]+([.][0-9]{1,2})?$",
                            }}
                          />
                          <Typography
                            sx={{ marginLeft: "auto", width: "100px" }}
                            variant="subtitle1"
                          >
                            {discountedPrice !== null
                              ? "PKR" +
                                (
                                  finalDiscountedPrice * cartItem.quantity
                                ).toFixed(2)
                              : "PKR" +
                                (finalProductPrice * cartItem.quantity).toFixed(
                                  2
                                )}
                          </Typography>
                        </Box>
                      </Card>
                    );
                  })}
                  <Grid
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1"> Subtotal:</Typography>
                    <Typography variant="subtitle1">
                      PKR: {cartTotalPrice.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">Discount:</Typography>
                    <Typography variant="subtitle1">PKR: {0}</Typography>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">Payable Amount:</Typography>
                    <Typography variant="subtitle1">
                      PKR: {cartTotalPrice.toFixed(2)}
                    </Typography>
                  </Grid>
                  {/* Proceed button */}
                  <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
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
export default withAuth(AddOrderPage);
