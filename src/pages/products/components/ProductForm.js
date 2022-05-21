import React, { useState } from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import SelectInput from 'components/Input/SelectInput';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Grid, makeStyles, Button, MenuItem } from '@material-ui/core';
import { createProduct, updateProduct } from 'state/ducks/product/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

import { DropzoneArea } from 'material-ui-dropzone';
import CheckBoxInput from 'components/Input/CheckBoxInput';

const schema = yup.object().shape({
  name: yup.string().required(),
  sku: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required(),
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

const ProductForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const { error, loading } = useSelector((state) => state.product);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new: false,
      ...preloadedValues,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (data) => {
    data.image = files;
    if (preloadedValues) {
      dispatch(updateProduct(preloadedValues.id, data));
    } else {
      dispatch(createProduct(data));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Input
            ref={register}
            id="name"
            type="text"
            label="Name"
            name="name"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Input
            ref={register}
            id="sku"
            type="text"
            label="SKU"
            name="sku"
            error={!!errors.sku}
            helperText={errors?.sku?.message}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Input
            ref={register}
            id="price"
            type="number"
            label="Price"
            name="price"
            error={!!errors.price}
            helperText={errors?.price?.message}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Input
            ref={register}
            id="stock"
            type="number"
            label="Stock"
            name="stock"
            error={!!errors.stock}
            helperText={errors?.stock?.message}
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
        <Grid item md={4} xs={12}>
          <Input
            ref={register}
            id="saleCount"
            type="number"
            label="Sale Count"
            name="saleCount"
            error={!!errors.saleCount}
            helperText={errors?.saleCount?.message}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Input
            ref={register}
            id="fullDescription"
            type="text"
            label="Full Description"
            name="fullDescription"
            error={!!errors.fullDescription}
            helperText={errors?.fullDescription?.message}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Input
            ref={register}
            id="shortDescription"
            type="text"
            label="Short Description"
            name="shortDescription"
            error={!!errors.shortDescription}
            helperText={errors?.shortDescription?.message}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <SelectInput
            ref={register}
            id="category"
            name="category"
            className={classes.textField}
            label="Category"
            control={control}
            defaultValue={''}
            variant="outlined"
            margin="normal"
            error={!!errors.category}
            helperText={errors?.category?.message}
          >
            <MenuItem value="chicken">Chicken</MenuItem>
            <MenuItem value="mutton">Mutton</MenuItem>
            <MenuItem value="beef">Beef</MenuItem>
          </SelectInput>
        </Grid>
        <Grid item md={2} xs={12}>
          <CheckBoxInput
            ref={register}
            id="new"
            name="new"
            label="New"
            control={control}
            error={!!errors.new}
            helperText={errors?.new?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <DropzoneArea
            initialFiles={preloadedValues ? preloadedValues.image : []}
            onChange={handleChange}
            dropzoneText="Drag and drop images here or click"
            showAlerts={false}
            filesLimit={5}
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
                'Update Product'
              ) : (
                'Save Product'
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ProductForm;
