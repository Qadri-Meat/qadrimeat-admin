import { Autocomplete, Avatar, Grid, TextField } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeals } from "store/deal";

const BookingItem = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDeals(""));
  }, [dispatch]);

  const { results } = useSelector((state) => state.deal);
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const image = value.length > 0 ? value[0] : "";
          return (
            <Avatar
              variant="rounded"
              src={image === "" ? "" : process.env.REACT_APP_API_URL + image}
            />
          );
        },
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: { minWidth: "100px", maxWidth: "100px" },
        }),
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: false,

        setCellProps: () => ({
          style: { minWidth: "100px", maxWidth: "100px" },
        }),
      },
    },
    {
      name: "day",
      label: "Day",
      options: {
        filter: false,
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: false,
      },
    },
    {
      name: "isPackage",
      label: "Package",
      options: {
        filter: false,
        setCellProps: () => ({
          style: { minWidth: "50px", maxWidth: "50px" },
        }),
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { minWidth: "100px", maxWidth: "100px" },
        }),
      },
    },
    {
      name: "price",
      label: "Sub Total",
      options: {
        filter: false,
      },
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={results}
          getOptionLabel={(option) => option.name}
          onChange={(event, values) => {}}
          renderInput={(params) => (
            <TextField {...params} label="Search Deals" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <MUIDataTable title={"Booking Items"} columns={columns} />
      </Grid>
    </Grid>
  );
};

export default BookingItem;
