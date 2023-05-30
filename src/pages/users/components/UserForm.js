import Form from "@core/components/forms/Form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "@core/components/ui/Loader";
import Message from "@core/components/ui/Message";
import { createUser, updateUser } from "store/user";
import FormInput from "@core/components/forms/FormInput";
import { Button, Grid, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SelectInput from "@core/components/forms/SelectInput";
import { emailRegix, passwordRegix } from "helper/regix";

const schema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string(),
  email: yup
    .string()
    .matches(emailRegix, "Enter Valid Email Address")
    .required(),
  password: yup
    .string()
    .matches(
      passwordRegix,
      "Password must be 8 characters, one letter and one number"
    )
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match"),
  role: yup.string().required("Role is a required field"),
});

const UserForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };
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
            {...register("name")}
            id="name"
            type="text"
            label="First Name"
            name="name"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("email")}
            id="email"
            type="email"
            label="Email"
            name="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("password")}
            id="password"
            type="password"
            label="Password"
            name="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectInput
            {...register("role")}
            id="role"
            name="role"
            label="Role"
            control={control}
            error={!!errors.role}
            helperText={errors?.role?.message}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </SelectInput>
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
