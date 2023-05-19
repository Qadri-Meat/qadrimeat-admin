import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import DataTable from "@core/components/ui/DataTable";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBooking, getBookings, resetBooking } from "store/booking";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useLocation } from "react-router-dom";
import { pick } from "helper/pick";
import withAuth from "hooks/withAuth";
const AllBookingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { paid } = pick(location.search);

  const [query, setQuery] = useState("");

  const data = useSelector((state) => state.booking);
  const { success } = data;
  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      dispatch(resetBooking());
    } else {
      dispatch(
        getBookings(`${query}${paid !== undefined ? `&isPaid=${paid}` : ""}`)
      );
    }
  }, [dispatch, paid, query, success]);

  const onDelete = async (value) => {
    dispatch(deleteBooking(value));
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
                  `/bookings${
                    value !== undefined && value !== null
                      ? `?paid=${value}`
                      : ""
                  }`
                );
              }}
            >
              <ToggleButton value="true">Paid</ToggleButton>
              <ToggleButton value="false">No Paid</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <DataTable
        title={"Booking List"}
        data={data}
        columns={columns}
        setQuery={setQuery}
        onEdit={
          authUser?.role === "user"
            ? null
            : (value) => {
                navigate(`/bookings/${value}`);
              }
        }
        onDelete={authUser?.role === "user" ? null : onDelete}
      />
    </AdminLayout>
  );
};

export default withAuth(AllBookingsPage);
