import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import DataTable from "@core/components/ui/DataTable";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExpense, getExpenses } from "store/expense";
const AllExpensesPage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = `?page=${selectedPage}`;
  const { user: authUser } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.expense);
  useEffect(() => {
    if (authUser) {
      dispatch(getExpenses(query));
    } else {
      navigate("/login");
    }
  }, [authUser, dispatch, navigate, query]);
  const onDelete = async (value) => {
    await dispatch(deleteExpense(value));
    dispatch(getExpenses(query)); // re-fetch the user data
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
    {
      name: "createdAt",
      label: "Date Added",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              {new Date(value).toLocaleDateString()},{" "}
              {new Date(value).toLocaleTimeString()}
            </>
          );
        },
      },
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
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            xs={10}
          >
            <Grid item>
              <Button
                onClick={() => navigate("/expenses/add-expenses")}
                variant="outlined"
                color="primary"
                size="small"
              >
                Add Expense
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <DataTable
          title={"Users List"}
          columns={columns}
          data={data}
          setQuery={setSelectedPage}
          onEdit={(value) => {
            navigate(`/expenses/${value}`);
          }}
          onDelete={onDelete}
        />
      </AdminLayout>
    </>
  );
};

export default AllExpensesPage;
