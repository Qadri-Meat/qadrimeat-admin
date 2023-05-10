import Form from "@core/components/forms/Form";
import FormInput from "@core/components/forms/FormInput";
import SelectInput from "@core/components/forms/SelectInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Grid, MenuItem } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
const schema = yup.object().shape({
  description: yup.string().required(),
  amount: yup.string().required(),
  type: yup.string().required("Type is a required field"),
});
const ExpenseForm = () => {
  const onSubmit = (data) => {
    console.log(data);
    // const postData = {
    //   name: data.name,
    //   email: data.email,
    //   password: data.password,
    //   role: data.role,
    // };
    // if (defaultValues) {
    //   dispatch(updateUser({ id: defaultValues.id, data }));
    // } else {
    //   dispatch(createUser(postData));
    // }
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("description")}
              id="description"
              type="text"
              label="Description"
              name="description"
              error={!!errors.description}
              helperText={errors?.description?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("amount")}
              id="amount"
              type="text"
              label="Amount"
              name="amount"
              error={!!errors.amount}
              helperText={errors?.amount?.message}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectInput
              {...register("type")}
              id="type"
              name="type"
              label="Type"
              control={control}
              error={!!errors.type}
              helperText={errors?.type?.message}
            >
              <MenuItem value="admin">Qurbani</MenuItem>
              <MenuItem value="user">Order</MenuItem>
            </SelectInput>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default ExpenseForm;
