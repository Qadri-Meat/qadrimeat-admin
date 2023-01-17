import React, { useEffect, useState } from "react";
import AdminLayout from "components/AdminLayout/AdminLayout";
import AdminBreadcrumbs from "components/AdminBreadcrumbs/AdminBreadcrumbs";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import MUIDataTable, { debounceSearchRender } from "mui-datatables";
import { getBookings, deleteBooking } from "state/ducks/booking/actions";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { pick } from "helpers/pick";
const useStyles = makeStyles((theme) => ({
  my3: {
    margin: "1.3rem 0",
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: ".85rem",
  },
  mLeft: {
    marginRight: ".85rem",
  },
  p1: {
    padding: ".85rem",
  },
}));

const AllBookingsPage = (props) => {
  const { history, location } = props;
  const { type = "retail", paid } = pick(location.search);
  const classes = useStyles();

  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedBookings, setSelectedBookings] = useState([]);

  const { results, page, totalResults } = useSelector((state) => state.booking);

  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      const query = `?page=${selectedPage}&limit=${limit}&sortBy=createdAt:desc&type=${type}${
        paid !== undefined ? `&isPaid=${paid}` : ""
      }${search !== "" ? `&search=${search}` : ""}`;
      dispatch(getBookings(query));
    } else {
      history.push("/login");
    }
  }, [history, authUser, dispatch, selectedPage, limit, paid, type, search]);

  const handleDeleteBookings = async () => {
    selectedBookings.forEach((item) => {
      dispatch(deleteBooking(results[item.index].id));
    });
  };

  const options = {
    filterType: "checkbox",
    count: totalResults,
    page: page,
    serverSide: true,
    customSearchRender: debounceSearchRender(2000),
    onRowClick: (rowData, rowState) => {
      console.log(rowState.rowIndex);
      history.push(`/bookings/${results[rowState.rowIndex].id}`);
    },
    onTableChange: (action, tableState) => {
      const { selectedRows } = tableState;
      switch (action) {
        case "rowsSelect":
          setSelectedBookings(selectedRows.data);
          break;
        case "rowDelete":
          handleDeleteBookings();
          break;
        case "changePage":
          setSelectedPage(tableState.page + 1);
          break;
        case "changeRowsPerPage":
          setLimit(tableState.rowsPerPage);
          setSelectedPage(1);
          break;
        case "search":
          setSearch(
            tableState.searchText !== undefined &&
              tableState.searchText !== null
              ? tableState.searchText
              : ""
          );
          break;
        default:
          break;
      }
    },
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value.firstName + " " + value.lastName}</>;
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
    // {
    //   name: 'deliveryTime',
    //   label: 'Delivery Time',
    //   options: {
    //     filter: false,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <>
    //           {new Date(value).toLocaleDateString()},{' '}
    //           {new Date(value).toLocaleTimeString()}
    //         </>
    //       );
    //     },
    //   },
    // },
    {
      name: "totalPrice",
      label: "TOTAL",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "totalPrice",
      label: "Balance",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          var totalPaid = results[rowIndex].transactions.reduce(function (
            a,
            b
          ) {
            return a + b.amount;
          },
          0);
          return <>{value - totalPaid}</>;
        },
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
      <Grid container className={classes.my3} alignItems="center">
        <Grid item className={classes.mRight}>
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
              onClick={() => history.push("/bookings/add-booking")}
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
                history.push(
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
                history.push(
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
      <AdminBreadcrumbs path={history} />
      <MUIDataTable
        title={"Bookings List"}
        data={results}
        columns={columns}
        options={options}
      />
    </AdminLayout>
  );
};

export default AllBookingsPage;
