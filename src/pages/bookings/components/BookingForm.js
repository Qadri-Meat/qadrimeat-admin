import Form from "@core/components/forms/Form";
import FormInput from "@core/components/forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
import * as yup from "yup";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import BookingItem from "./BookingItem";
const schema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string(),
  phone: yup.string().required(),
  address: yup.string().required(),
  postalCode: yup.string(),
  notes: yup.string(),
});
const BookingForm = () => {
  let shippingDetails = {
    city: "Lahore, Punjab",
    country: "Pakistan",
    postalCode: "54030",
    discount: 0,
  };
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
    console.log(data);
  };

  return (
    <Fragment>
      <BookingItem />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("name")}
              id="name"
              type="text"
              label="First Name"
              name="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
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
              Update Booking
              {/* {loading ? <Loader /> : defaultValues ? "Update User" : "Save User"} */}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Fragment>
  );
};

export default BookingForm;
