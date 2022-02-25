import React, { useState } from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Grid, makeStyles, Button, MenuItem } from '@material-ui/core';
import { createCategory, updateCategory } from 'state/ducks/category/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

const schema = yup.object().shape({
  name: yup.string().required(),
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

const CategoryForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.category);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (preloadedValues) {
      dispatch(updateCategory(preloadedValues.id, data));
    } else {
      dispatch(createCategory(data));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3}>
        <Grid item xs={4}>
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
                'Update Category'
              ) : (
                'Save Category'
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default CategoryForm;
