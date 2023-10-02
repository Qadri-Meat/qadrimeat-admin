import Form from "@core/components/forms/Form";
import FormInput from "@core/components/forms/FormInput";
import SelectInput from "@core/components/forms/SelectInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Grid, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import Loader from "@core/components/ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AddStock, updateStock } from "store/stock";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
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
  price: yup
    .number()
    .required()
    .positive()
    .typeError("Amount is required field"),
});

const StockForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.stock);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const postData = {
      weight: data.weight,
      price: data.price,
      category: data.category[0],
    };
    if (!defaultValues) {
      dispatch(AddStock(data));
    } else {
      dispatch(updateStock({ id: defaultValues.id, data: postData }));
    }
    navigate("/stocks");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
              {...register("price")}
              id="price"
              type="number"
              label="Amount per (KG)"
              name="price"
              error={!!errors.price}
              helperText={errors?.price?.message}
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
                "Update Stock"
              ) : (
                "Save Stock"
              )}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default StockForm;
