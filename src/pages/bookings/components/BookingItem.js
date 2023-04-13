import {
  Autocomplete,
  Avatar,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getDeals } from "store/deal";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  updateCartItem,
} from "store/cart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getDiscountPrice } from "helper/product";
const BookingItem = () => {
  const [searchBar, setSearchBar] = useState(0);
  const dispatch = useDispatch();
  let cartTotalPrice = 0;
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData, rowIndex } = tableMeta;
          const cartItem = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          const discountedPrice = getDiscountPrice(
            cartItem.price,
            cartItem.discount
          );
          const finalProductPrice = cartItem.price * 1;
          const finalDiscountedPrice = discountedPrice * 1;
          cartTotalPrice = rowIndex === 0 ? 0 : cartTotalPrice;
          discountedPrice != null
            ? (cartTotalPrice += finalDiscountedPrice * cartItem.quantity)
            : (cartTotalPrice += finalProductPrice * cartItem.quantity);

          return (
            <>
              {discountedPrice !== null ? (
                <>
                  <span
                    style={{ textDecoration: "line-through", color: "gray" }}
                  >
                    {"PKR " + finalProductPrice}
                  </span>
                  <br />
                  <span className="amount">
                    {"    PKR " + finalDiscountedPrice}
                  </span>
                </>
              ) : (
                <span>{"PKR " + finalProductPrice}</span>
              )}
            </>
          );
        },
      },
    },
    {
      name: "day",
      label: "Day",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cartItem = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <select
              name="day"
              id="day"
              value={value}
              hidden={!cartItem.isPackage}
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
          const cartItem = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <input
              type="time"
              id="appt"
              name="appt"
              value={value}
              hidden={!cartItem.isPackage}
              onChange={(e) => {
                dispatch(
                  updateCartItem({ id: cartItem.id, time: e.target.value })
                );
              }}
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
          const { rowData } = tableMeta;
          const cartItem = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <div style={{ width: "max-content" }}>
              <IconButton
                onClick={() => {
                  dispatch(decrementQuantity(cartItem.id));
                }}
              >
                <RemoveIcon />
              </IconButton>
              {value}
              <IconButton
                onClick={() => {
                  dispatch(incrementQuantity(cartItem.id));
                }}
              >
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
      customBodyRender: (value, tableMeta, updateValue) => {
        const { rowData } = tableMeta;
        const cartItem = items.filter((item) => {
          return item.id === rowData[0];
        })[0];
        const discountedPrice = getDiscountPrice(
          cartItem.price,
          cartItem.discount
        );
        const finalProductPrice = cartItem.price * 1;
        const finalDiscountedPrice = discountedPrice * 1;
        return (
          <>
            {discountedPrice !== null
              ? "PKR " + finalDiscountedPrice * cartItem.quantity
              : "PKR " + finalProductPrice * cartItem.quantity}
          </>
        );
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    count: 100,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            m: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="body1">
              PKR
              {" " + cartTotalPrice}
            </Typography>
          </Box>
        </Box>
      );
    },
  };

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
                time: "10:00",
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
        <MUIDataTable
          title={"Booking Items"}
          columns={columns}
          data={items}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default BookingItem;
