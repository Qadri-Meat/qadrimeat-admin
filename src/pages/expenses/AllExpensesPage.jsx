import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import DataTable from "@core/components/ui/DataTable";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getExpenses } from "store/expense";
const AllExpensesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.expense);
  useEffect(() => {
    if (authUser) {
      dispatch(getExpenses(""));
    } else {
      navigate("/login");
    }
  }, [authUser, dispatch, navigate]);
  const onDelete = async (value) => {
    // re-fetch the user data
  };
  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "amount",
      label: "Amount",
    },
  ];
  return (
    <>
      <AdminLayout>
        <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              Expenses
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => navigate("/expenses/add-expense")}
              variant="outlined"
              color="primary"
              size="small"
            >
              Add Expenses
            </Button>
          </Grid>
        </Grid>
        <DataTable
          title={"Users List"}
          columns={columns}
          data={data}
          onEdit={(value) => {
            navigate(`/users/${value}`);
          }}
          onDelete={onDelete}
        />
      </AdminLayout>
    </>
  );
};

export default AllExpensesPage;
