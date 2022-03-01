import React, { useEffect } from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useData } from '../../../context/DataContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Input/Input';
import Message from '../../../components/Message/Message';
import Loader from '../../../components/Loader/Loader';
import { login } from 'state/ducks/auth/actions';

const schema = yup.object().shape({
  phone: yup.string().required(),
  password: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#0d131d',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  mBottom: {
    marginBottom: '.5rem',
  },
  button: {
    marginTop: '.85rem',
  },
  loginCard: {
    width: '275px',
    borderRadius: 5,
    background: '#fff',
    padding: '.85rem',
  },
}));

const LoginPage = (props) => {
  const { setValues, data } = useData();
  const classes = useStyles();
  const { history, location } = props;

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, user, message, loading } = auth;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { phone: data.phone, password: data.password },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(login(data));
    setValues(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  return (
    <div className={classes.root}>
      <div className={classes.loginCard}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        {/* <Typography className={classes.brand} variant="h5" component="h1">
          Login
        </Typography> */}
        <Typography className={classes.mBottom} variant="body1">
          Sign In to your account
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {message && <Message severity="error">{message}</Message>}
          <Input
            ref={register}
            id="phone"
            type="tel"
            label="Phone"
            name="phone"
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <Input
            ref={register}
            id="password"
            type="password"
            label="Password"
            name="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <div className={classes.mBottom}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              className={classes.button}
            >
              {loading ? <Loader /> : 'Login'}
            </Button>
          </div>
        </Form>
        <Typography variant="caption">&copy; QADRI MEAT | Admin</Typography>
      </div>
    </div>
  );
};

export default LoginPage;
