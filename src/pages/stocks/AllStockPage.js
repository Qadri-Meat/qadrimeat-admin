import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import DataTable from "@core/components/ui/DataTable";
import { Button, Grid, Typography } from "@mui/material";
import withAuth from "hooks/withAuth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStock, getStocks, resetStock } from "store/stock";

const AllStocksPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { results, totalResults, success } = useSelector(
    (state) => state.stock
  );

  useEffect(() => {
    if (success) {
      dispatch(resetStock());
    } else {
      dispatch(getStocks(query));
    }
  }, [success, dispatch, query]);

  const onDelete = (value) => {
    dispatch(deleteStock(value));
  };

  const onEdit = (value) => {
    navigate(`/stock/${value}`);
  };

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "category",
      label: "Category",
    },
    {
      name: "weight",
      label: "Weight",
    },
    {
      name: "price",
      label: "Amount(per KG)",
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
            Stocks
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
              onClick={() => navigate("/stock/add-stock")}
              variant="outlined"
              color="primary"
              size="small"
            >
              Add Stock
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DataTable
        title={"Stock List"}
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

export default withAuth(AllStocksPage);
