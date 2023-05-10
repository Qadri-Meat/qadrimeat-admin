import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React from "react";
import ExpenseForm from "./components/ExpenseForm";

const AddExpensePage = () => {
  return (
    <>
      <AdminLayout>
        <Grid container sx={{ my: 3 }} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              Add Expense
              {/* {details ? "Update User" : "Create User"} */}
            </Typography>
          </Grid>
        </Grid>
        <AdminBreadcrumbs />
        <div>
          <ExpenseForm />
          {/* <UserForm defaultValues={details} key={details ? details.id : 1} /> */}
        </div>
      </AdminLayout>
    </>
  );
};

export default AddExpensePage;
