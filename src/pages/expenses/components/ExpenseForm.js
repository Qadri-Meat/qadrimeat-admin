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
import { createExpense, updateExpense } from 'state/ducks/expenses/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

const schema = yup.object().shape({
  description: yup.string().required(),
  type: yup.string().required(),
  amount: yup.number().required(),
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

const ExpenseForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.expenses);
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
      dispatch(updateExpense(preloadedValues.id, data));
    } else {
      dispatch(createExpense(data));
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
            id="amount"
            type="number"
            label="amount"
            name="amount"
            className={classes.textField}
            error={!!errors.amount}
            helperText={errors?.amount?.message}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SelectInput
            ref={register}
            id="type"
            name="type"
            className={classes.textField}
            label="type"
            control={control}
            defaultValue={''}
            variant="outlined"
            margin="normal"
            error={!!errors.type}
            helperText={errors?.type?.message}
          >
            <MenuItem value="meat">Meat</MenuItem>
            <MenuItem value="rent">Rent</MenuItem>
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
                'Update Expense'
              ) : (
                'Save Expense'
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ExpenseForm;
