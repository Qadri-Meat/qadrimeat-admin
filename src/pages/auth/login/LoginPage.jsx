import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@core/components/forms/Form";
import Message from "@core/components/ui/Message";
import Loader from "@core/components/ui/Loader";
import { loginUser } from "store/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "@core/components/forms/FormInput";
import { Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#0d131d",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  mBottom: {
    marginBottom: ".5rem",
  },
  button: {
    marginTop: ".85rem",
  },
  loginCard: {
    width: "275px",
    borderRadius: 5,
    background: "#fff",
    padding: ".85rem",
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user: authUser, message, loading } = auth;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate, loading]);

  const errorMessage = message ? (
    <Message severity="error">{message}</Message>
  ) : null;
  return (
    <div className={classes.root}>
      <div className={classes.loginCard}>
        <Typography variant="h5" component="h1">
          Login
        </Typography>
        <Typography className={classes.mBottom} variant="body1">
          Sign In to your account
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {errorMessage}
          <FormInput
            {...register("email")}
            id="email"
            type="text"
            label="Email"
            name="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          <FormInput
            {...register("password")}
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
              {loading ? <Loader /> : "Login"}
            </Button>
          </div>
        </Form>
        <Typography variant="caption">&copy; QadriMeat | Admin</Typography>
      </div>
    </div>
  );
};

export default LoginPage;
