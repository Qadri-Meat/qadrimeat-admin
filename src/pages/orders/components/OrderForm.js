import Form from "@core/components/forms/Form";
import FormInput from "@core/components/forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, Grid } from "@mui/material";
import * as yup from "yup";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";

import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "helper/product";
import { createBooking, updateBooking } from "store/booking";
import Loader from "@core/components/ui/Loader";
import Message from "@core/components/ui/Message";
import OrderItemForm from "./OrderItemForm";
import { emailRegix } from "helper/regix";
const phoneRegExp = /^(?:\+1)?\s*(?:\d{3}[\s-]?\d{3}[\s-]?\d{4}|\d{11})$/;

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .matches(emailRegix, "Enter Valid Email Address")
    .required(),
  phone: yup
    .string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid"),
  address: yup.string().required(),
  postalCode: yup.string(),
  notes: yup.string(),
});
const OrderForm = ({ preloadedValues }) => {
  const [itemsError, setItemsError] = useState(false);
  const dispatch = useDispatch();
  let cart1TotalPrice = 0;
  const { error, loading } = useSelector((state) => state.booking);
  const items = useSelector((state) => state.reducer.cart);
  let shippingDetails = {
    city: "Lahore, Punjab",
    country: "Pakistan",
    postalCode: "54030",
    discount: 0,
  };
  if (preloadedValues !== undefined) {
    shippingDetails = {
      ...preloadedValues.shippingDetails,
      discount: preloadedValues.discount,
    };
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: shippingDetails,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (items.length === 0) {
      setItemsError(true);
      return;
    } else {
      setItemsError(false);
    }
    const discount = data.discount;
    delete data.discount;
    cart1TotalPrice = 0 - Number(discount);
    items.forEach((item) => {
      const discountedPrice = getDiscountPrice(item.price, item.discount);
      const finalProductPrice = item.price * 1;
      const finalDiscountedPrice = discountedPrice * 1;

      discountedPrice != null
        ? (cart1TotalPrice += finalDiscountedPrice * item.quantity)
        : (cart1TotalPrice += finalProductPrice * item.quantity);
    });
    const newBooking = {
      phone: data.phone,
      bookingItems: items,
      shippingDetails: {
        ...data,
        city: "Lahore",
        country: "Pakistan",
      },
      shippingPrice: 0,
      totalPrice: cart1TotalPrice ? cart1TotalPrice : 0,
      discount,
      deliveryTime: Date.now(),
    };
    if (preloadedValues) {
      dispatch(updateBooking({ id: preloadedValues.id, data: newBooking }));
    } else {
      dispatch(createBooking(newBooking));
    }
  };

  return (
    <Fragment>
      {error && <Message severity="error">{error}</Message>}
      <OrderItemForm />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("firstName")}
              id="firstName"
              type="text"
              label="First Name"
              name="firstName"
              error={!!errors.firstName}
              helperText={errors?.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("lastName")}
              id="last-name"
              type="text"
              label="Last Name"
              name="lastName"
              error={!!errors.lastName}
              helperText={errors?.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("email")}
              id="email"
              type="email"
              label="Email"
              name="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("phone")}
              id="phone"
              type="number"
              label="Phone"
              name="phone"
              error={!!errors.phone}
              helperText={errors?.phone?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("address")}
              id="address"
              type="text"
              label="Address"
              name="address"
              error={!!errors.address}
              helperText={errors?.address?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("city")}
              id="city"
              type="text"
              label="City"
              name="city"
              disabled
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("country")}
              id="country"
              type="text"
              label="Country"
              name="country"
              disabled
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormInput
              {...register("notes")}
              id="notes"
              type="text"
              label="notes"
              name="notes"
              error={!!errors.notes}
              helperText={errors?.notes?.message}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormInput
              {...register("discount")}
              id="discount"
              type="number"
              label="Discount"
              name="discount"
              error={!!errors.discount}
              helperText={errors?.discount?.message}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              endIcon={<SaveIcon />}
            >
              {loading ? (
                <Loader />
              ) : preloadedValues ? (
                "Update Order"
              ) : (
                "Save Order"
              )}
            </Button>
          </Grid>
        </Grid>
      </Form>
      {itemsError && (
        <Alert style={{ marginTop: "10px" }} severity="error">
          please select the Product
        </Alert>
      )}
    </Fragment>
  );
};

export default OrderForm;
