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
  amountperkg: yup
    .number()
    .required()
    .positive()
    .typeError("Amount is required field"),
});
const StockForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.expense);
  const onSubmit = (data) => {
    const postData = {
      weight: data.weight,
      type: data.category,
      amount: data.amount,
    };
    if (defaultValues) {
      dispatch(updateStock({ id: defaultValues.id, data }));
    } else {
      dispatch(AddStock(postData));
    }
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

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
              {...register("amountperkg")}
              id="amountperkg"
              type="number"
              label="Amount per (KG)"
              name="amountperkg"
              error={!!errors.amountperkg}
              helperText={errors?.amountperkg?.message}
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
              {loading ? <Loader /> : "Save Stock"}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default StockForm;
