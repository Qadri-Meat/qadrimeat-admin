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
import { createUser, updateUser } from 'state/ducks/user/actions';
import Loader from 'components/Loader/Loader';
import Message from 'components/Message/Message';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  role: yup.string().required(),
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

const UserForm = ({ preloadedValues }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
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
      dispatch(updateUser(preloadedValues.id, data));
    } else {
      dispatch(createUser(data));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {error && <Message severity="error">{error}</Message>}

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="username"
            type="text"
            label="Username"
            name="username"
            error={!!errors.username}
            helperText={errors?.username?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            ref={register}
            id="email"
            type="text"
            label="Email"
            name="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item xs={4}>
          <SelectInput
            ref={register}
            id="role"
            name="role"
            className={classes.textField}
            label="Role"
            control={control}
            defaultValue={''}
            variant="outlined"
            margin="normal"
            error={!!errors.role}
            helperText={errors?.role?.message}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
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
                'Update User'
              ) : (
                'Save User'
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default UserForm;
