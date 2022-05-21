import React from 'react';
import Form from 'components/Form/Form';
import Input from 'components/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import SelectInput from 'components/Input/SelectInput';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { Grid, makeStyles, Button, MenuItem } from '@material-ui/core';
import { createStock, updateStock } from 'state/ducks/stocks/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

const schema = yup.object().shape({
  description: yup.string().required(),
  category: yup.string().required(),
  cost: yup.number().required(),
  weight: yup.number().required(),
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

const StockForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.stocks);
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
      dispatch(updateStock(preloadedValues.id, data));
    } else {
      dispatch(createStock(data));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <Input
            ref={register}
            id="description"
            type="text"
            label="description"
            name="description"
            className={classes.textField}
            error={!!errors.description}
            helperText={errors?.description?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            ref={register}
            id="cost"
            type="number"
            label="cost"
            name="cost"
            className={classes.textField}
            error={!!errors.cost}
            helperText={errors?.cost?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            ref={register}
            id="weight"
            type="number"
            label="weight"
            name="weight"
            className={classes.textField}
            error={!!errors.weight}
            helperText={errors?.weight?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectInput
            ref={register}
            id="category"
            name="category"
            className={classes.textField}
            label="category"
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
                'Update Stock'
              ) : (
                'Save Stock'
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default StockForm;
