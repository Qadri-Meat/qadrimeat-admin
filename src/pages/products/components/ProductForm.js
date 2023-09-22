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
import { DropzoneArea } from "material-ui-dropzone";
import { useState } from "react";
import { createProducts, updateProducts } from "store/product";
import { getImageUrl, isValidImages } from "helper/helpers";

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
  weight: yup
    .number()
    .required()
    .positive()
    .typeError("Weight is required field"),
  discount: yup
    .number()
    .required("Discount is a required field")
    .typeError("Discount must be a number"),
  saleCount: yup
    .number()
    .required("Sale count is a required field")
    .typeError("Sale count must be a number"),
  category: yup
    .mixed()
    .test("isCategoryValid", "Category is a required field", function (value) {
      return (
        value !== undefined &&
        (typeof value === "string" || Array.isArray(value))
      );
    })
    .transform(function (value, originalValue) {
      if (originalValue && typeof originalValue === "string") {
        return [originalValue];
      }
      return value;
    })
    .nullable(true),
});

const ProductForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { message, loading } = useSelector((state) => state.product);

  const initialFiles = (defaultValues?.image || []).map(
    (i) => `${getImageUrl(i)}`
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultValues?.name,
      sku: defaultValues?.sku,
      price: defaultValues?.price,
      weight: defaultValues?.weight,
      stock: defaultValues?.stock,
      discount: defaultValues?.discount,
      saleCount: defaultValues?.saleCount,
      fullDescription: defaultValues?.fullDescription,
      shortDescription: defaultValues?.shortDescription,
      category: defaultValues?.category,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (newFiles) => {
    if (isValidImages(newFiles)) {
      setFiles(newFiles);
    }
  };

  const onSubmit = (data) => {
    data.category = data.category[0];
    data.image = files;
    if (defaultValues) {
      dispatch(updateProducts({ id: defaultValues.id, data }));
    } else {
      dispatch(createProducts(data));
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
            {...register("weight")}
            id="weight"
            type="number"
            label="Weight (KG)"
            name="weight"
            error={!!errors.weight}
            helperText={errors?.weight?.message}
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
            {...register("discount")}
            id="discount"
            type="number"
            label="Discount"
            name="discount"
            error={!!errors.discount}
            helperText={errors?.discount?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("saleCount")}
            id="saleCount"
            type="number"
            label="Sale Count"
            name="saleCount"
            error={!!errors.saleCount}
            helperText={errors?.saleCount?.message}
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
            helperText={errors?.category?.message}
          >
            <MenuItem value="chicken">Chicken</MenuItem>
            <MenuItem value="beef">Beef</MenuItem>
            <MenuItem value="mutton">Mutton</MenuItem>
          </SelectInput>
        </Grid>
        <Grid item xs={12}>
          <DropzoneArea
            maxFileSize={5242880}
            onChange={handleChange}
            showAlerts={false}
            filesLimit={5}
            dropzoneText=""
            initialFiles={initialFiles}
            acceptedFiles={[
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/gif",
            ]}
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
            {loading ? (
              <Loader />
            ) : defaultValues ? (
              "Update Product"
            ) : (
              "Save Product"
            )}
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ProductForm;
