import React from "react";
import Form from "@core/components/forms/Form";

import { useDispatch, useSelector } from "react-redux";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Loader from "@core/components/ui/Loader";
import Message from "@core/components/ui/Message";
import { createUser, updateUser } from "store/user";
import FormInput from "@core/components/forms/FormInput";
import { Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup.string().required(),
});

const UserForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (defaultValues) {
      dispatch(updateUser({ id: defaultValues.id, data }));
    } else {
      dispatch(createUser(data));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {message && <Message severity="error">{message}</Message>}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("firstName")}
            id="firstName"
            type="text"
            label="First Name"
            name="firstName"
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("lastName")}
            id="lastName"
            type="text"
            label="Last Name"
            name="lastName"
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("phone")}
            id="phone"
            type="tel"
            label="Phone"
            name="phone"
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
        </Grid>

        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            endIcon={<SaveIcon />}
          >
            {loading ? <Loader /> : defaultValues ? "Update User" : "Save User"}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default UserForm;
