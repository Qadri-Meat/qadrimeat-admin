import React, { useEffect } from "react";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "./components/UserForm";
import { getUser } from "store/user";
import { Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import withAuth from "hooks/withAuth";

const AddUserPage = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details, success } = useSelector((state) => state.user);
  useEffect(() => {
    if (userId !== "add-user") dispatch(getUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      navigate("/users");
    }
  }, [dispatch, success, navigate]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            {details ? "Update User" : "Create User"}
          </Typography>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      <div>
        <UserForm defaultValues={details} key={details ? details.id : 1} />
      </div>
    </AdminLayout>
  );
};

export default withAuth(AddUserPage);
