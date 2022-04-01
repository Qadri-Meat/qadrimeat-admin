import React from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Grid, makeStyles, Button } from '@material-ui/core';
import { addToCart } from 'state/ducks/cart/actions';

const schema = yup.object().shape({
  name: yup.string(),
  price: yup.number(),
  quantity: yup.number().required(),
  discount: yup.number().required(),
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

const OrderItemForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(
      addToCart({
        ...data,
        name: preloadedValues.name,
        price: preloadedValues.price,
        image: preloadedValues.image,
        product: preloadedValues.product,
      })
    );
    reset({});
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid item xs={12}>
          <Input
            ref={register}
            id="name"
            type="text"
            label="Name"
            name="name"
            disabled
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            ref={register}
            id="price"
            type="number"
            label="Price"
            name="price"
            disabled
            error={!!errors.price}
            helperText={errors?.price?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            ref={register}
            id="discount"
            type="number"
            label="Discount %"
            name="discount"
            error={!!errors.discount}
            helperText={errors?.discount?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            ref={register}
            id="quantity"
            type="number"
            label="Quantity"
            name="quantity"
            error={!!errors.quantity}
            helperText={errors?.quantity?.message}
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
              Add Item
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default OrderItemForm;
