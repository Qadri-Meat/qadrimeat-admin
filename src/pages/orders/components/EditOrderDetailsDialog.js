import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import CustomTextField from "@core/components/admin/CustomTextField";
import Loader from "@core/components/ui/Loader";
import { Message } from "@mui/icons-material";
import Form from "@core/components/forms/Form";

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup
    .string()
    .matches(/^\+?\d{1,4}[-.\s]?\d{1,14}$/i, "Invalid phone number"),
  address: yup.string(),
  city: yup.string(),
  postalCode: yup.string().matches(/^[a-zA-Z0-9\s-]*$/, "Invalid postal code"),
  country: yup.string(),
});

const EditOrderDetailsDialog = ({ show, setShow, preloadedValues, id }) => {
  const { error, loading } = useSelector((state) => state.order);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: preloadedValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth>
      <DialogTitle>Update Shipping Details</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {error && <Message severity="error">{error}</Message>}
          <CustomTextField
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="John Doe"
            errors={errors.firstName}
            control={control}
          />

          <CustomTextField
            id="lastName"
            type="text"
            label="Last Name"
            name="lastName"
            errors={errors.lastName}
            control={control}
          />
          <CustomTextField
            id="phone"
            type="text"
            label="Phone"
            name="phone"
            errors={errors.phone}
            control={control}
          />
          <CustomTextField
            id="address"
            type="text"
            label="Address"
            name="address"
            errors={errors.address}
            control={control}
          />
          <CustomTextField
            id="city"
            type="text"
            label="City"
            name="city"
            errors={errors.city}
            control={control}
          />
          <CustomTextField
            id="postalCode"
            type="text"
            label="Postal Code"
            name="postalCode"
            errors={errors.postalCode}
            control={control}
          />
          <CustomTextField
            id="country"
            type="text"
            label="Country"
            name="country"
            errors={errors.country}
            control={control}
          />
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              endIcon={<SaveIcon />}
              style={{ marginLeft: "8px" }}
            >
              {loading ? <Loader /> : "Update"}
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderDetailsDialog;
