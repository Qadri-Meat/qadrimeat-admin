import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Typography, Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@core/components/ui/DataTable";
import { getBatches } from "store/batch";

const AllBatchesPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const data = useSelector((state) => state.batch);

  useEffect(() => {
    dispatch(getBatches(query));
  }, [dispatch, query]);

  const columns = [
    {
      name: "id",
      label: "Id",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value.substring(0, 10)}</>;
        },
      },
    },
  ];

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Batches
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate("/batches/add-batch")}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Batch
          </Button>
        </Grid>
      </Grid>
      <DataTable
        data={data}
        columns={columns}
        setQuery={setQuery}
        onEdit={(value) => {
          navigate(`/batches/${value}`);
        }}
      />
    </AdminLayout>
  );
};

export default AllBatchesPage;
