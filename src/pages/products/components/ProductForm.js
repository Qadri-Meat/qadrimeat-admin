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
import Compressor from "compressorjs";
import CheckBoxInput from "@core/components/forms/CheckBoxInput";
import { createProducts, updateProducts } from "store/product";

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
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.product);
  const defaultFormValues = {
    ...defaultValues,
    // Set category as an empty string if it's undefined
    image: "",
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultFormValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (files) => {
    // Check if the file is an image
    if (files[0] ? files[0].type.startsWith("image/") : []) {
      // Compress the image
      new Compressor(files[0], {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        success(result) {
          // Create a new File object from the compressed image data
          const compressedFile = new File([result], files[0].name, {
            type: files[0].type,
          });
          // Set the compressed image as the new file
          setFiles([compressedFile]);
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      // Set the original file if it is not an image
      setFiles(files);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
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
            name="discount"
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
            <MenuItem value="cow">Cow</MenuItem>
            <MenuItem value="goat">Goat</MenuItem>
          </SelectInput>
        </Grid>
        <Grid item md={2} xs={12}>
          <CheckBoxInput
            {...register("new")}
            id="new"
            name="new"
            label="New"
            control={control}
            error={!!errors.new}
            helperText={errors?.new?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <DropzoneArea
            maxFileSize={5242880}
            onChange={handleChange}
            showAlerts={false}
            filesLimit={5}
            dropzoneText=""
            initialFiles={defaultValues?.image ? [defaultValues.image] : []}
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
