import {
  Autocomplete,
  Avatar,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getDeals } from "store/deal";
import { addToCart } from "store/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const BookingItem = () => {
  const [searchBar, setSearchBar] = useState(0);
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.deal);
  const items = useSelector((state) => state.reducer.cart);
  useEffect(() => {
    dispatch(getDeals(""));
  }, [dispatch]);
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <select
              name="day"
              id="day"
              value={value}
              hidden={!cart1Item.isPackage}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          );
        },
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <input
              type="time"
              id="appt"
              name="appt"
              value={value}
              hidden={!cart1Item.isPackage}
            />
          );
        },
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
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <select
              name="isPackage"
              id="isPackage"
              value={value}
              style={{ minWidth: "80px", maxWidth: "80px" }}
            >
              <option value="true">Package</option>
              <option value="false">Non Package</option>
            </select>
          );
        },
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

        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div style={{ width: "max-content" }}>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              {value}
              <IconButton>
                <AddIcon />
              </IconButton>
            </div>
          );
        },
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
          key={searchBar}
          disablePortal
          id="combo-box-demo"
          options={results}
          getOptionLabel={(option) => option.name}
          onChange={(event, values) => {
            if (values) {
              const item = {
                id: uuidv4(),
                name: values.name,
                quantity: 1,
                price: values.price,
                discount: 0,
                image: values.image,
                deal: values.id,
                day: 1,
                time: "10 am",
                isPackage: true,
              };
              dispatch(addToCart(item));
              setSearchBar(Math.random());
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Deals" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <MUIDataTable title={"Booking Items"} columns={columns} data={items} />
      </Grid>
    </Grid>
  );
};

export default BookingItem;
