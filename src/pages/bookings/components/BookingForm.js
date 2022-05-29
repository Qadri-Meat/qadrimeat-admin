import React, { useEffect, Fragment } from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { createBooking, updateBooking } from 'state/ducks/booking/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';
import { getDeals } from 'state/ducks/deal/actions';
import BookingItems from './BookingItems';
import { getDiscountPrice } from 'helpers/product';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  phone: yup.string().required(),
  address: yup.string().required(),
  postalCode: yup.string(),
  notes: yup.string(),
});

const useStyles = makeStyles((theme) => ({
  mBottom: {
    display: 'flex',
    justifyContent: 'center',
  },
  mTop: {
    marginTop: '20px',
  },
  button: {
    padding: '10px',
  },
  textField: {
    width: '100%',
  },
}));

const BookingForm = ({ preloadedValues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let cart1TotalPrice = 0;

  const { error, loading } = useSelector((state) => state.booking);

  const items = useSelector((state) => state.cart1);
  let shippingDetails = {
    city: 'Lahore, Punjab',
    country: 'Pakistan',
    postalCode: '54030',
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
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
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
        city: 'Lahore',
        country: 'Pakistan',
      },
      shippingPrice: 0,
      totalPrice: cart1TotalPrice,
      type: 'retail',
      discount,
      deliveryTime: Date.now(),
    };

    if (preloadedValues) {
      dispatch(updateBooking(preloadedValues.id, newBooking));
    } else {
      dispatch(createBooking(newBooking));
    }
  };

  useEffect(() => {
    dispatch(getDeals(1, 100));
  }, [dispatch]);

  return (
    <Fragment>
      {error && <Message severity="error">{error}</Message>}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <BookingItems />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="firstName"
                type="text"
                label="First Name"
                name="firstName"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="lastName"
                type="text"
                label="Last Name"
                name="lastName"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            </Grid>
            {/* <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="email"
                type="email"
                label="Email"
                name="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            </Grid> */}
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="phone"
                type="phone"
                label="phone"
                name="phone"
                error={!!errors.phone}
                helperText={errors?.phone?.message}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="address"
                type="text"
                label="address"
                name="address"
                error={!!errors.address}
                helperText={errors?.address?.message}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="city"
                type="text"
                label="city"
                name="city"
                disabled
                error={!!errors.city}
                helperText={errors?.city?.message}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="country"
                type="text"
                label="country"
                name="country"
                disabled
                error={!!errors.country}
                helperText={errors?.country?.message}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="notes"
                type="text"
                label="notes"
                name="notes"
                error={!!errors.notes}
                helperText={errors?.notes?.message}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="discount"
                type="number"
                label="Discount"
                name="discount"
                error={!!errors.discount}
                helperText={errors?.discount?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.mBottom}>
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
                    'Update Booking'
                  ) : (
                    'Save Booking'
                  )}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      </Grid>
    </Fragment>
  );
};

export default BookingForm;
