import React, { useEffect } from "react";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import { Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BatchForm from "./components/BatchForm";
import { getBatch } from "store/batch";
import { useNavigate, useParams } from "react-router-dom";

const AddBatchPage = (props) => {
  const params = useParams();
  const batchId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { details, success } = useSelector((state) => state.batch);

  useEffect(() => {
    if (batchId !== "add-batch") dispatch(getBatch(batchId));
  }, [dispatch, batchId]);

  useEffect(() => {
    if (success) {
      navigate("/batches");
    }
  }, [dispatch, success, navigate]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            {details ? "Update Batch" : "Create Batch"}
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      <div>
        <BatchForm defaultValues={details} key={details ? details.id : 1} />
      </div>
    </AdminLayout>
  );
};

export default AddBatchPage;
