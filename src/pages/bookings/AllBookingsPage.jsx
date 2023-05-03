import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import DataTable from "@core/components/ui/DataTable";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBooking, getBookings } from "store/booking";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation } from "react-router-dom";
import { pick } from "helper/pick";
const AllBookingsPage = () => {
  const location = useLocation();
  const { type = "retail", paid } = pick(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  const data = useSelector((state) => state.booking);
  const { user: authUser } = useSelector((state) => state.auth);
  const query = `${page}&type=${type}${
    paid !== undefined ? `&isPaid=${paid}` : ""
  }`;
  useEffect(() => {
    if (authUser) {
      dispatch(getBookings(query));
    } else {
      navigate("/login");
    }
  }, [dispatch, authUser, navigate, paid, type, page, query]);

  const onDelete = async (value) => {
    await dispatch(deleteBooking(value));
    dispatch(getBookings(query)); // re-fetch the user data
  };
  const columns = [
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: false,
      },
    },
    {
      name: "shippingDetails",
      label: "Name",
      options: {
        filter: false,
        customBodyRender: (values, tableMeta, updateValue) => {
          if (!values || !values.firstName) {
            return "";
          }
          return <>{values.firstName + " " + (values.lastName || "")}</>;
        },
      },
    },
    {
      name: "createdAt",
      label: "Created At",
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
    {
      name: "totalPrice",
      label: "TOTAL",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "approvedAt",
      label: "Approved",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },
    {
      name: "deliveredAt",
      label: "Delivered",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },
  ];

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Bookings
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
              onClick={() => navigate("/bookings/add-booking")}
              variant="outlined"
              color="primary"
              size="small"
            >
              Add Booking
            </Button>
          </Grid>

          <Grid item>
            <ToggleButtonGroup
              color="primary"
              style={{ marginRight: "10px" }}
              value={paid}
              size="small"
              exclusive
              onChange={(event, value) => {
                navigate(
                  `/bookings?type=${type}${
                    value !== undefined && value !== null
                      ? `&paid=${value}`
                      : ""
                  }`
                );
              }}
            >
              <ToggleButton value="true">Paid</ToggleButton>
              <ToggleButton value="false">No Paid</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              color="primary"
              value={type}
              size="small"
              exclusive
              onChange={(event, value) => {
                navigate(
                  `/bookings?type=${
                    value !== undefined && value !== null
                      ? `${value}`
                      : `${type}`
                  }`
                );
              }}
            >
              <ToggleButton value="online">Online</ToggleButton>
              <ToggleButton value="retail">Retail</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <DataTable
        title={"Booking List"}
        data={data}
        columns={columns}
        setQuery={setPage}
        onEdit={(value) => {
          navigate(`/bookings/${value}`);
        }}
        onDelete={onDelete}
      />
    </AdminLayout>
  );
};

export default AllBookingsPage;
