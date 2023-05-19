import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDeal, getDeals, resetDeal } from "store/deal";
import DataTable from "@core/components/ui/DataTable";
import MemoizedAvatar from "@core/components/extra/MemoizedAvatar";
import withAuth from "hooks/withAuth";
const AllDealsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const data = useSelector((state) => state.deal);
  const { success } = data;
  const { user: authUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (success) {
      dispatch(resetDeal());
    } else {
      dispatch(getDeals(query));
    }
  }, [navigate, dispatch, query, success]);
  const onDelete = async (value) => {
    dispatch(deleteDeal(value));
  };

  const columns = [
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const image = value.length > 0 ? value[0] : "";
          return (
            <MemoizedAvatar
              src={image === "" ? "" : process.env.REACT_APP_IMAGE_URL + image}
            />
          );
        },
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "sku",
      label: "SKU",
    },
    {
      name: "price",
      label: "Price",
    },
    {
      name: "stock",
      label: "Stock",
    },
  ];

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Deals
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate("/deals/add-deal")}
            variant="outlined"
            color="primary"
            size="small"
          >
            Add Deal
          </Button>
        </Grid>
      </Grid>
      <DataTable
        title={"Deals List"}
        data={data}
        columns={columns}
        setQuery={setQuery}
        onEdit={
          authUser?.role === "user"
            ? null
            : (value) => {
                navigate(`/deals/${value}`);
              }
        }
        onDelete={authUser?.role === "user" ? null : onDelete}
      />
    </AdminLayout>
  );
};

export default withAuth(AllDealsPage);
