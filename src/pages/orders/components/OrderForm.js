import React, { useState, useEffect, Fragment } from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import {
  Grid,
  makeStyles,
  Button,
  Avatar,
  Typography,
  Box,
  TextField,
} from '@material-ui/core';
import { createOrder, updateOrder } from 'state/ducks/order/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

import { Autocomplete } from '@material-ui/lab';
import MUIDataTable from 'mui-datatables';
import { getProducts } from 'state/ducks/product/actions';
import { getDiscountPrice } from 'helpers/product';
import {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  changeWeight,
} from 'state/ducks/cart/actions';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  postalCode: yup.string(),
  notes: yup.string(),
  discount: yup.number(),
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

const OrderForm = ({ preloadedValues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let cartTotalPrice = 0;

  const { error, loading } = useSelector((state) => state.order);

  const [searchBar, setSearchBar] = useState(1);

  const items = useSelector((state) => state.cart);
  const { results } = useSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: 'Lahore, Punjab',
      country: 'Pakistan',
      address: 'Street 113, Sector N Dha Phase 1',
      phone: '+923044014345',
      email: 'qadrimeat@gmail.com',
      firstName: 'Qadri',
      lastName: 'Meat',
      postalCode: '54030',
      discount: 0,
      ...preloadedValues,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const discount = data.discount;
    delete data.discount;

    const newOrder = {
      phone: data.phone,
      orderItems: items,
      shippingDetails: {
        ...data,
        city: 'Lahore',
        country: 'Pakistan',
      },
      shippingPrice: 0,
      totalPrice: cartTotalPrice - Number(discount),
      discount: Number(discount),
      type: 'retail',
      deliveryTime: Date.now(),
    };
    if (preloadedValues) {
      dispatch(updateOrder(preloadedValues.id, newOrder));
    } else {
      dispatch(createOrder(newOrder));
    }
  };

  useEffect(() => {
    dispatch(getProducts(1, 100));
  }, [dispatch]);

  const options = {
    filterType: 'checkbox',
    count: 100,
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach(({ index }) => {
        dispatch(deleteFromCart(items[index]));
      });
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            m: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="body1">
              PKR
              {' ' + cartTotalPrice}
            </Typography>
          </Box>
        </Box>
      );
    },
  };

  const columns = [
    {
      name: 'product',
      label: 'product',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'image',
      label: 'Image',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const image = value.length > 0 ? value[0] : '';
          return (
            <Avatar
              variant="rounded"
              src={image === '' ? '' : process.env.REACT_APP_API_URL + image}
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
        sort: false,
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData, rowIndex } = tableMeta;
          const cartItem = items.filter((item) => {
            return item.product === rowData[0];
          })[0];
          const discountedPrice = getDiscountPrice(
            cartItem.price,
            cartItem.discount
          );
          const finalProductPrice = (cartItem.price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
          cartTotalPrice = rowIndex === 0 ? 0 : cartTotalPrice;

          let productPrice =
            discountedPrice !== null
              ? finalDiscountedPrice * cartItem.quantity
              : finalProductPrice * cartItem.quantity;
          productPrice = productPrice * cartItem.weight;
          cartTotalPrice += productPrice;

          return (
            <>
              {discountedPrice !== null ? (
                <>
                  <span
                    style={{ textDecoration: 'line-through', color: 'gray' }}
                  >
                    {'PKR ' + finalProductPrice}
                  </span>
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
      name: 'discount',
      label: 'Discount',
      options: {
        filter: true,
        sort: false,
        display: false,
      },
    },
    {
      name: 'quantity',
      label: 'Quantity',
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { minWidth: '50px', maxWidth: '50px' },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cartItem = items.filter((item) => {
            return item.product === rowData[0];
          })[0];
          return (
            <>
              <IconButton
                onClick={() => {
                  dispatch(addToCart(cartItem));
                }}
              >
                <AddIcon />
              </IconButton>
              {value}
              <IconButton
                onClick={() => {
                  if (cartItem.quantity === 1) {
                    dispatch(deleteFromCart(cartItem));
                  } else {
                    dispatch(decreaseQuantity(cartItem));
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
            </>
          );
        },
      },
    },
    {
      name: 'weight',
      label: 'Weight',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cartItem = items.filter((item) => {
            return item.product === rowData[0];
          })[0];
          return (
            <input
              type="number"
              value={value}
              style={{ minWidth: '70px', maxWidth: '70px' }}
              onChange={(e) => {
                dispatch(changeWeight(cartItem, e.target.value));
              }}
            />
          );
        },
      },
    },
    {
      name: 'price',
      label: 'Sub Total',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cartItem = items.filter((item) => {
            return item.product === rowData[0];
          })[0];
          const discountedPrice = getDiscountPrice(
            cartItem.price,
            cartItem.discount
          );
          const finalProductPrice = (cartItem.price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
          let productPrice =
            discountedPrice !== null
              ? finalDiscountedPrice * cartItem.quantity
              : finalProductPrice * cartItem.quantity;
          productPrice = productPrice * cartItem.weight;
          return <>{'PKR ' + productPrice.toFixed(2)}</>;
        },
      },
    },
  ];
  return (
    <Fragment>
      {error && <Message severity="error">{error}</Message>}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              key={searchBar}
              disablePortal
              id="combo-box-demo"
              options={results}
              getOptionLabel={(option) => option.name}
              onChange={(event, values) => {
                if (values) {
                  const item = {
                    name: values.name,
                    quantity: values.quantity,
                    price: values.price,
                    discount: 0,
                    image: values.image,
                    product: values.id,
                    weight: 1,
                  };
                  dispatch(addToCart(item));
                  setSearchBar(Math.random());
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Search Products" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <MUIDataTable
              title={'Order Items'}
              data={items}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>

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
            <Grid item md={4} xs={12}>
              <Input
                ref={register}
                id="email"
                type="email"
                label="Email"
                name="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            </Grid>
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
                    'Update Order'
                  ) : (
                    'Save Order'
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

export default OrderForm;
