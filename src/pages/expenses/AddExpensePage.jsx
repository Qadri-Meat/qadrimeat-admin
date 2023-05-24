import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExpense } from "store/expense";
import withAuth from "hooks/withAuth";

const AddExpensePage = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details, success } = useSelector((state) => state.expense);
  useEffect(() => {
    if (userId !== "") dispatch(getExpense(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    if (success) {
      navigate("/expenses");
    }
  }, [dispatch, success, navigate]);
  return (
    <>
      <AdminLayout>
        <Grid container sx={{ my: 3 }} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              {details ? "Update Expense" : "Add Expense"}
            </Typography>
          </Grid>
        </Grid>
        <AdminBreadcrumbs />
        <div>
          <ExpenseForm defaultValues={details} key={details ? details.id : 1} />
        </div>
      </AdminLayout>
    </>
  );
};

export default withAuth(AddExpensePage);
