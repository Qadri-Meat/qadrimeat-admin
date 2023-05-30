import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import DataTable from "@core/components/ui/DataTable";
import { Button, Grid, Typography } from "@mui/material";
import withAuth from "hooks/withAuth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteExpense, getExpenses, resetExpense } from "store/expense";

const AllExpensesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { results, totalResults, success } = useSelector(
    (state) => state.expense
  );

  useEffect(() => {
    if (success) {
      dispatch(resetExpense());
    } else {
      dispatch(getExpenses(query));
    }
  }, [success, dispatch, query]);

  const onDelete = (value) => {
    dispatch(deleteExpense(value));
  };

  const onEdit = (value) => {
    navigate(`/expenses/${value}`);
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
        title={"Expense List"}
        columns={columns}
        results={results}
        totalResults={totalResults}
        setQuery={setQuery}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </AdminLayout>
  );
};

export default withAuth(AllExpensesPage);
