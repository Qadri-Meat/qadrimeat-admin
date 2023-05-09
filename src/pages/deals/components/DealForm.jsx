import Form from "@core/components/forms/Form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "@core/components/ui/Loader";
import Message from "@core/components/ui/Message";
import FormInput from "@core/components/forms/FormInput";
import { Button, Grid, MenuItem } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SelectInput from "@core/components/forms/SelectInput";
import { createDeal, updateDeal } from "store/deal";
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
const schema = yup.object().shape({
  name: yup.string().required(),
  sku: yup.string().required(),
  price: yup
    .number()
    .required()
    .positive()
    .typeError("Price is required field"),
  stock: yup
    .number()
    .required()
    .positive()
    .typeError("Stock is required field"),
  category: yup.string().required("Category is a required field"),
});
const DealForm = ({ defaultValues }) => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.deal);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const handleChange = (files) => {
    setFiles(files);
  };
  const onSubmit = (data) => {
    data.image = files;
    if (defaultValues) {
      dispatch(updateDeal({ id: defaultValues.id, data }));
    } else {
      dispatch(createDeal(data));
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
            {...register("sku")}
            id="sku"
            type="text"
            label="SKU"
            name="sku"
            error={!!errors.sku}
            helperText={errors?.sku?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("price")}
            id="price"
            type="number"
            label="Price"
            name="price"
            error={!!errors.price}
            helperText={errors?.price?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("stock")}
            id="stock"
            type="number"
            label="Stock"
            name="stock"
            error={!!errors.stock}
            helperText={errors?.stock?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("fullDescription")}
            id="fullDescription"
            type="fullDescription"
            label="Full Description"
            name="fullDescription"
            error={!!errors.fullDescription}
            helperText={errors?.fullDescription?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("shortDescription")}
            id="shortDescription"
            type="shortDescription"
            label="Short Description"
            name="shortDescription"
            error={!!errors.shortDescription}
            helperText={errors?.shortDescription?.message}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SelectInput
            {...register("category")}
            id="category"
            name="category"
            label="Category"
            control={control}
            error={!!errors.category}
            helperText={errors.category?.message || " "}
          >
            <MenuItem value="chicken">Chicken</MenuItem>
            <MenuItem value="mutton">Mutton</MenuItem>
            <MenuItem value="beef">Beef</MenuItem>
          </SelectInput>
        </Grid>
        <Grid item xs={12}>
          <DropzoneArea
            maxFileSize={5242880}
            initialFiles={defaultValues ? defaultValues.image : []}
            onChange={handleChange}
            showAlerts={false}
            filesLimit={5}
            dropzoneText=""
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
            {loading ? <Loader /> : defaultValues ? "Update Deal" : "Save Deal"}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default DealForm;
