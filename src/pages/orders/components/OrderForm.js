import React, { useState, useEffect, Fragment } from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
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
} from '@material-ui/core';
import { createOrder, updateOrder } from 'state/ducks/order/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';
import MUIDataTable from 'mui-datatables';
import { getProducts } from 'state/ducks/product/actions';
import OrderItemForm from './OrderItemForm';
import { getDiscountPrice } from 'helpers/product';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  postalCode: yup.string(),
  country: yup.string().required(),
  notes: yup.string(),
});

const useStyles = makeStyles((theme) => ({
  mBottom: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px',
  },
  textField: {
    width: '100%',
  },
}));

const columns = [
  {
    name: 'id',
    label: 'Id',
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
        const { rowData: product } = tableMeta;
        const price = product[3];
        const discount = product[4];
        const discountedPrice = getDiscountPrice(price, discount);
        const finalProductPrice = (price * 1).toFixed(2);
        const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
        return (
          <>
            {discountedPrice !== null ? (
              <>
                <span style={{ textDecoration: 'line-through', color: 'gray' }}>
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
      sort: true,
      display: false,
    },
  },
];

const OrderForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  let cartTotalPrice = 0;

  const [orderItem, setOrderItem] = useState({});
  const [key, setKey] = useState(Math.random());

  const { error, loading } = useSelector((state) => state.order);
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
      ...preloadedValues,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getProducts(1, 100));
  }, [dispatch]);

  const onSubmit = (data) => {
    if (preloadedValues) {
      dispatch(updateOrder(preloadedValues.id, data));
    } else {
      dispatch(createOrder(data));
    }
  };
  const options = {
    filterType: 'checkbox',
    onRowClick: (rowData, rowState) => {
      setOrderItem({
        name: results[rowState.rowIndex].name,
        quantity: 1,
        price: results[rowState.rowIndex].price,
        discount: results[rowState.rowIndex].discount,
        product: results[rowState.rowIndex].id,
        image: results[rowState.rowIndex].image,
      });
      setKey(Math.random());
    },
  };
  const options1 = {
    filterType: 'checkbox',
    onRowClick: (rowData, rowState) => {
      setOrderItem({
        name: items[rowState.rowIndex].name,
        quantity: items[rowState.rowIndex].quantity,
        price: items[rowState.rowIndex].price,
        discount: items[rowState.rowIndex].discount,
        product: items[rowState.rowIndex].id,
        image: items[rowState.rowIndex].image,
      });
      setKey(Math.random());
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

  const columns1 = [
    {
      name: 'id',
      label: 'Id',
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
          const { rowData: cartItem } = tableMeta;
          console.log(cartItem);
          const price = cartItem[3];
          const discount = cartItem[4];
          const quantity = cartItem[5];
          const discountedPrice = getDiscountPrice(price, discount);
          const finalProductPrice = (price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);

          discountedPrice != null
            ? (cartTotalPrice += finalDiscountedPrice * quantity)
            : (cartTotalPrice += finalProductPrice * quantity);

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
          const price = cartItem[3];
          const discount = cartItem[4];
          const quantity = cartItem[5];
          const discountedPrice = getDiscountPrice(price, discount);
          const finalProductPrice = (price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
          return (
            <>
              {discountedPrice !== null
                ? 'PKR ' + (finalDiscountedPrice * quantity).toFixed(2)
                : 'PKR ' + (finalProductPrice * quantity).toFixed(2)}
            </>
          );
        },
      },
    },
  ];
  return (
    <Fragment>
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <MUIDataTable
            title={'Products'}
            data={results}
            columns={columns}
            options={options}
          />
        </Grid>
        <Grid item xs={6} key={key}>
          <OrderItemForm preloadedValues={orderItem} />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title={'Order Items'}
            data={items}
            columns={columns1}
            options={options1}
          />
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
