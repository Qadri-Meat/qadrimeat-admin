import React, { useEffect, useState } from "react";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Button,
  ButtonGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "hooks/withAuth";
import {
  addToCart,
  changeDiscount,
  changeWeight,
  decrementQuantity,
  incrementQuantity,
  reSetCart,
  removeItem,
} from "store/cart";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createOrder } from "store/order";
import { getProducts, updateProducts } from "store/product";
import { useNavigate } from "react-router-dom";
import Loader from "@core/components/ui/Loader";
import { getImageUrl } from "helper/helpers";
const AddOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart);
  const { success, selectedOrder, loading } = useSelector(
    (state) => state.order
  );

  const [expanded, setExpanded] = useState(null);
  const [stock, setStock] = useState();

  const handleAccordionChange = (index) => {
    setExpanded(index === expanded ? null : index);
  };

  const handleAddToCart = (product) => {
    setStock(product.stock - 1);
    const newItem = {
      id: product.id,
      name: product.name,
      quantity: 1,
      price: product.price,
      discount: 0,
      weight: 1,
      image: product.image,
      product: product.id,
    };

    dispatch(addToCart(newItem));
    const updatedProduct = {
      ...product,
      stock: product.stock - 1,
    };
    dispatch(updateProducts({ id: product.id, updatedProduct }));
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(removeItem(productId));
  };
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity * item.weight,
    0
  );
  // Calculate total discount
  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total + ((item.price * item.discount) / 100) * item.quantity,
    0
  );

  // Calculate payable amount after discount
  const payableAmount = subtotal - totalDiscount;

  const onSubmit = () => {
    const newOrder = {
      phone: "+92 302-4000719",
      orderItems: cartItems, // Use cartItems from redux state
      shippingDetails: {
        phone: "+92 302-4000719",
        firstName: "Qadri",
        lastName: "Meat",
        address: "Lahore",
        city: "Lahore",
        country: "Pakistan",
      },
      shippingPrice: 0,
      totalPrice: payableAmount,
      discount: totalDiscount,
      deliveryTime: Date.now(),
    };

    dispatch(createOrder(newOrder));
  };

  const handleDiscountChange = (e, item) => {
    const discount = parseInt(e.target.value);

    dispatch(changeDiscount({ item, discount }));
  };

  const handleWeightChange = (e, item) => {
    const weight = parseInt(e.target.value);

    dispatch(changeWeight({ item, weight }));
  };

  useEffect(() => {
    if (success) {
      navigate(`/orders/${selectedOrder.id}`);
    }
  }, [success, dispatch, navigate, selectedOrder]);

  useEffect(() => {
    dispatch(reSetCart());
    const query = `limit=${100}&page=${1}`;
    dispatch(getProducts(query));
  }, [dispatch]);

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
                  {cartItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <Accordion
                        expanded={expanded === index}
                        onChange={() => handleAccordionChange(index)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index + 1}a-content`}
                          id={`panel${index + 1}a-header`}
                        >
                          <Typography>{item.name}</Typography>
                          <Typography
                            sx={{ marginLeft: "auto" }}
                            variant="subtitle1"
                          >
                            {item.discount !== 0 ? (
                              <>
                                <span
                                  style={{ textDecoration: "line-through" }}
                                >
                                  PKR: {item.price}
                                </span>{" "}
                                PKR:{" "}
                                {item.price -
                                  (item.price * item.discount) / 100}
                              </>
                            ) : (
                              `PKR: ${item.price}`
                            )}
                          </Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <TextField
                                type="number"
                                label="Discount %"
                                size="small"
                                value={item.discount}
                                onChange={(e) => handleDiscountChange(e, item)}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <TextField
                                type="number"
                                label="Weight"
                                size="small"
                                value={item.weight}
                                onChange={(e) => handleWeightChange(e, item)}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <ButtonGroup
                                sx={{ marginLeft: "30px" }}
                                size="small"
                                aria-label="quantity"
                              >
                                <Button
                                  onClick={() => {
                                    if (item.quantity === 1) {
                                      dispatch(removeItem(item.id));
                                    } else {
                                      dispatch(decrementQuantity(item.id));
                                      setStock(stock + 1);
                                    }
                                  }}
                                >
                                  -
                                </Button>
                                <Button>{item.quantity}</Button>
                                <Button
                                  disabled={stock <= 0}
                                  onClick={() => {
                                    dispatch(incrementQuantity(item.id));
                                    setStock(stock - 1);
                                  }}
                                >
                                  +
                                </Button>
                              </ButtonGroup>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <IconButton
                                onClick={() => handleRemoveFromCart(item.id)}
                                aria-label="delete"
                              >
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </Grid>
                          </Grid>

                          {item.discount < 0 && (
                            <span
                              style={{
                                color: "red",
                                fontSize: 12,
                              }}
                            >
                              {" "}
                              Discount cann't be less than 0{" "}
                            </span>
                          )}

                          {item.weight <= 0 && (
                            <span
                              style={{
                                color: "red",
                                fontSize: 12,
                              }}
                            >
                              {" "}
                              Weight cann't be 0 or less than 0{" "}
                            </span>
                          )}
                          {stock <= 0 && (
                            <span
                              style={{
                                color: "red",
                                fontSize: 12,
                              }}
                            >
                              {" "}
                              Not enough stock{" "}
                            </span>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </React.Fragment>
                  ))}
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
                      PKR: {subtotal.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">Discount:</Typography>
                    <Typography variant="subtitle1">
                      PKR: {totalDiscount.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    item
                    xs={12}
                  >
                    <Typography variant="subtitle1">Payable Amount:</Typography>
                    <Typography variant="subtitle1">
                      PKR: {payableAmount.toFixed(2)}
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
                        disabled={totalDiscount < 0 || subtotal < 1}
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
