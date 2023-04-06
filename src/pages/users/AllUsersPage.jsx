import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";

import { useDispatch, useSelector } from "react-redux";
import DataTable from "@core/components/ui/DataTable";
import { getUsers } from "store/user";
import { Button, Grid, Typography } from "@mui/material";
import { deleteUser } from "store/user";
const AllUsersPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const data = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUsers(query));
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
      name: "email",
      label: "Email",
    },
    {
      name: "role",
      label: "Role",
    },
  ];

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Users
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate("/users/add-user")}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      <DataTable
        title={"Users List"}
        data={data}
        columns={columns}
        setQuery={setQuery}
        onEdit={(value) => {
          navigate(`/users/${value}`);
        }}
        onDelete={(value) => {
          dispatch(deleteUser(value));
        }}
      />
    </AdminLayout>
  );
};

export default AllUsersPage;
