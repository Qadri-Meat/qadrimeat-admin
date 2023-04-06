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
const schema = yup.object().shape({
  name: yup.string(),
});

const DealForm = ({ defaultValues }) => {
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

  const onSubmit = (data) => {
    console.log(data);
    // const postData = {
    //   name: data.name,
    //   email: data.email,
    //   password: data.password,
    //   role: data.role,
    // };
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
            type="email"
            label="SKU"
            name="sku"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("price")}
            id="price"
            type="price"
            label="Price"
            name="price"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormInput
            {...register("weight")}
            id="weight"
            type="weight"
            label="Weight"
            name="weight"
            error={!!errors.Cpassword}
            helperText={errors?.Cpassword?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("stock")}
            id="stock"
            type="stock"
            label="Stock"
            name="stock"
            error={!!errors.Cpassword}
            helperText={errors?.Cpassword?.message}
          />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <FormInput
            {...register("discount")}
            id="discount"
            type="discount"
            label="Discount"
            name="discount"
            error={!!errors.Cpassword}
            helperText={errors?.Cpassword?.message}
          />
        </Grid> */}
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("saleCount")}
            id="saleCount"
            type="saleCount"
            label="Sale Count"
            name="saleCount"
            error={!!errors.Cpassword}
            helperText={errors?.Cpassword?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("fullDescription")}
            id="fullDescription"
            type="fullDescription"
            label="Full Description"
            name="fullDescription"
            error={!!errors.Cpassword}
            helperText={errors?.Cpassword?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormInput
            {...register("shortDescription")}
            id="shortDescription"
            type="shortDescription"
            label="Short Description"
            name="shortDescription"
            error={!!errors.Cpassword}
            helperText={errors?.Cpassword?.message}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <SelectInput
            {...register("category")}
            id="category"
            name="category"
            label="Category"
            control={control}
            error={!!errors.role}
            helperText={errors?.role?.message}
          >
            <MenuItem value="chicken">Chicken</MenuItem>
            <MenuItem value="mutton">Mutton</MenuItem>
            <MenuItem value="beef">Beef</MenuItem>
          </SelectInput>
        </Grid>

        <Grid item xs={12}>
          <DropzoneArea />
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
