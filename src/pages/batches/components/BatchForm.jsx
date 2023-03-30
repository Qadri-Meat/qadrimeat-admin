import React from "react";

import Form from "@core/components/forms/Form";
import Loader from "@core/components/ui/Loader";
import Message from "@core/components/ui/Message";
import FormInput from "@core/components/forms/FormInput";

import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "@mui/icons-material/Save";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button } from "@mui/material";
import { createBatch, updateBatch } from "store/batch";
import AllTags from "./AllTags";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  quantity: yup.string(),
});

const BatchForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.batch);
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
      dispatch(
        updateBatch({
          id: defaultValues.id,
          data: { name: data.name, description: data.description },
        })
      );
    } else {
      dispatch(createBatch(data));
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
            label="Name"
            name="name"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
        </Grid>
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
        {!defaultValues && (
          <Grid item xs={12} md={4}>
            <FormInput
              {...register("quantity")}
              id="quantity"
              type="number"
              label="Quantity"
              name="quantity"
              error={!!errors.quantity}
              helperText={errors?.quantity?.message}
            />
          </Grid>
        )}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            endIcon={<SaveIcon />}
          >
            {loading ? (
              <Loader />
            ) : defaultValues ? (
              "Update Batch"
            ) : (
              "Save Batch"
            )}
          </Button>
        </Grid>
        {defaultValues && (
          <Grid item xs={12}>
            <AllTags batchId={defaultValues.id} />
          </Grid>
        )}
      </Grid>
    </Form>
  );
};

export default BatchForm;
