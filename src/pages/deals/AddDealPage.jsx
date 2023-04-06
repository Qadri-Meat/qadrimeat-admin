import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDeal } from "store/deal";

const AddDealPage = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details, success } = useSelector((state) => state.deal);
  useEffect(() => {
    if (userId !== "add-deal") dispatch(getDeal(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      navigate("/deals");
    }
  }, [dispatch, success, navigate]);
  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            {details ? "Update Deal" : "Create Deal"}
          </Typography>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AddDealPage;
