import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import withAuth from "hooks/withAuth";
import { getProduct } from "store/product";
import ProductForm from "./components/ProductForm";

const AddProductPage = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details, success } = useSelector((state) => state.product);
  useEffect(() => {
    if (userId) dispatch(getProduct(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      navigate("/products");
    }
  }, [dispatch, success, navigate]);
  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            {details ? "Update Product" : "Add Product"}
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      <div>
        <ProductForm defaultValues={details} key={details ? details.id : 1} />
      </div>
    </AdminLayout>
  );
};

export default withAuth(AddProductPage);
