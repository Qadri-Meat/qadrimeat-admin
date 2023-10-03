import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import withAuth from "hooks/withAuth";
import StockForm from "./components/StockForm";
import { getStock } from "store/stock";

const AddStockPage = () => {
  const params = useParams();
  const stockId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { details, success } = useSelector((state) => state.stock);

  useEffect(() => {
    if (stockId !== "") dispatch(getStock(stockId));
  }, [dispatch, stockId]);

  useEffect(() => {
    if (success) {
      navigate("/stocks");
    }
  }, [dispatch, success, navigate]);

  return (
    <>
      <AdminLayout>
        <Grid container sx={{ my: 3 }} alignItems="center">
          <Grid item>
            <Typography variant="h5" component="h1">
              {details ? "Update Stock" : "Add Stock"}
            </Typography>
          </Grid>
        </Grid>
        <AdminBreadcrumbs />
        <div>
          <StockForm defaultValues={details} key={details ? details.id : 1} />
        </div>
      </AdminLayout>
    </>
  );
};

export default withAuth(AddStockPage);
