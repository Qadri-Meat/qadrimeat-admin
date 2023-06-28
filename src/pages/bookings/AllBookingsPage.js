import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import DataTable from "@core/components/ui/DataTable";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookings, resetBooking, deleteBooking } from "store/booking";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControl from "@mui/material/FormControl";
import { useLocation } from "react-router-dom";
import { pick } from "helper/pick";
import withAuth from "hooks/withAuth";
import { numberWithCommas } from "helper/numers";
import FileOpenIcon from "@mui/icons-material/FileOpenOutlined";

const AllBookingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { paid } = pick(location.search);
  const [query, setQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { results, totalResults, success } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    if (success) {
      dispatch(resetBooking());
    } else {
      dispatch(
        getBookings(
          `${paid !== undefined ? `isPaid=${paid}&` : ""}${
            selectedYear !== "" ? `year=${selectedYear}&` : ""
          }${query}`
        )
      );
    }
  }, [dispatch, paid, query, success, selectedYear]);

  const onDelete = (value) => {
    dispatch(deleteBooking(value));
  };

  const handlePaidToggle = (event, value) => {
    navigate(`/bookings?paid=${value}`);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    navigate(`/bookings?year=${year}`);
  };

  const columns = [
    {
      name: "id",
      label: "View",
      options: {
        filter: false,
        customBodyRender: (values, tableMeta, updateValue) => {
          return (
            <Button href={`/bookings/${values}`}>
              <FileOpenIcon />
            </Button>
          );
        },
      },
    },
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
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{numberWithCommas(value)}</>;
        },
      },
    },
    {
      name: "totalPrice",
      label: "Total Paid",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          const totalPaid = results[rowIndex].transactions.reduce(function (
            a,
            b
          ) {
            return a + b.amount;
          },
          0);

          return <>{numberWithCommas(totalPaid)}</>;
        },
      },
    },
    {
      name: "totalPrice",
      label: "Balance",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          const totalPaid = results[rowIndex].transactions.reduce(function (
            a,
            b
          ) {
            return a + b.amount;
          },
          0);

          return <>{numberWithCommas(value - totalPaid)}</>;
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
          <Grid sx={{ marginLeft: "450px" }} item>
            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                label="Year"
                onChange={handleYearChange}
                variant="outlined"
              >
                <MenuItem value={"2022"}>2022</MenuItem>
                <MenuItem value={"2023"}>2023</MenuItem>
              </Select>
            </FormControl>
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
              <ToggleButton value="false">UnPaid</ToggleButton>
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
        onDelete={onDelete}
      />
    </AdminLayout>
  );
};

export default withAuth(AllBookingsPage);
