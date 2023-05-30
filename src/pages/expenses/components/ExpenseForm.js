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
import { createExpense, updateExpense } from "store/expense";
const schema = yup.object().shape({
  description: yup.string().required(),
  amount: yup.string().required(),
  type: yup.string().required("Type is a required field"),
});
const ExpenseForm = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.expense);
  const onSubmit = (data) => {
    const postData = {
      description: data.description,
      amount: data.amount,
      type: data.type,
    };
    if (defaultValues) {
      dispatch(updateExpense({ id: defaultValues.id, data }));
    } else {
      dispatch(createExpense(postData));
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
              type="number"
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
              <MenuItem value="booking">Qurbani</MenuItem>
              <MenuItem value="order">Order</MenuItem>
              {/* <MenuItem value="Labor_costs">Labor costs</MenuItem>
              <MenuItem value="Raw_material">Raw materials</MenuItem>
              <MenuItem value="Equipment">Equipment and supplies</MenuItem>
              <MenuItem value="Utilities">Utilities</MenuItem>
              <MenuItem value="Marketing">Marketing and advertising</MenuItem> */}
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
              {loading ? (
                <Loader />
              ) : defaultValues ? (
                "Update Expense"
              ) : (
                "Save Expense"
              )}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default ExpenseForm;
