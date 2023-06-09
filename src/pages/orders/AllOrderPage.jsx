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
const AllOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { paid } = pick(location.search);
  const [query, setQuery] = useState("");

  const { results, totalResults, success } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (success) {
      dispatch(resetBooking());
    } else {
      dispatch(
        getBookings(
          `${paid !== undefined ? `isPaid=${paid}&` : ""} : ""
          }${query}`
        )
      );
    }
  }, [dispatch, paid, query, success]);

  const onDelete = (value) => {
    dispatch(deleteBooking(value));
  };

  const onEdit = (value) => {
    navigate(`/bookings/${value}`);
  };

  const handlePaidToggle = (event, value) => {
    navigate(`/bookings?paid=${value}`);
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
      label: "Delivery Time",
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
      label: "Created At",
      options: {
        filter: true,
        sort: false,
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
      name: "approvedAt",
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
            Orders
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
              Add Order
            </Button>
          </Grid>

          <Grid item>
            <ToggleButtonGroup
              color="primary"
              style={{ marginRight: "10px" }}
              value={paid}
              size="small"
              exclusive
              onChange={handlePaidToggle}
            >
              <ToggleButton value="true">Paid</ToggleButton>
              <ToggleButton value="false">No Paid</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <DataTable
        title={"Booking List"}
        results={results}
        totalResults={totalResults}
        columns={columns}
        setQuery={setQuery}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </AdminLayout>
  );
};

export default withAuth(AllOrderPage);
