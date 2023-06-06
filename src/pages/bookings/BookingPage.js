import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { getBooking } from "store/booking";
import { getDiscountPrice } from "helper/product";
import BookingPageRightPanels from "@core/components/extra/BookingPageRightPanels/BookingPageRightPanels";
import MemoizedAvatar from "@core/components/extra/MemoizedAvatar";
import { formatTime } from "helper/formatTime";

const BookingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBooking } = useSelector((state) => state.booking);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBooking(id));
  }, [dispatch, id, navigate]);

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
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "price",
      label: "Price",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "discount",
      label: "Discount",
      options: {
        filter: true,
        sort: false,
        display: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData: cartItem } = tableMeta;
          const price = cartItem[2];
          const discount = cartItem[3];
          const discountedPrice = getDiscountPrice(price, discount);
          const finalProductPrice = (price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);

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
      name: "quantity",
      label: "Quantity",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "day",
      label: "Day",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          return selectedBooking.bookingItems[rowIndex].isPackage ? value : "";
        },
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowIndex } = tableMeta;
          const isPackage = selectedBooking.bookingItems[rowIndex].isPackage;

          if (isPackage) {
            const formattedTime = formatTime(value);
            return formattedTime;
          } else {
            return "";
          }
        },
      },
    },
    {
      name: "isPackage",
      label: "Package",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <>{value ? <CheckIcon /> : <ClearIcon />}</>;
        },
      },
    },
    {
      name: "price",
      label: "Sub Total",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData: cartItem } = tableMeta;
          const price = cartItem[2];
          const discount = cartItem[3];
          const quantity = cartItem[4];
          const discountedPrice = getDiscountPrice(price, discount);
          const finalProductPrice = (price * 1).toFixed(2);
          const finalDiscountedPrice = (discountedPrice * 1).toFixed(2);
          return (
            <>
              {discountedPrice !== null
                ? "PKR " + (finalDiscountedPrice * quantity).toFixed(2)
                : "PKR " + (finalProductPrice * quantity).toFixed(2)}
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    filter: false,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            m: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Sub Total</Typography>
            <Typography variant="body1">
              Rs
              {" " +
                selectedBooking.totalPrice -
                selectedBooking.shippingPrice +
                (selectedBooking.discount || 0)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Shipping Price</Typography>
            <Typography variant="body1">
              Rs{" " + selectedBooking.shippingPrice}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Discount</Typography>
            <Typography variant="body1">
              Rs{" " + (selectedBooking.discount || 0)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="body1">
              Rs{" " + selectedBooking.totalPrice}
            </Typography>
          </Box>
        </Box>
      );
    },
  };
  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} gap={1} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Booking Details
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={() => navigate(`/bookings/update-booking/${id}`)}
            variant="outlined"
            color="primary"
            size="small"
          >
            Update Booking
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              window.open(`/bookings/invoice/${id}`, "_blank");
            }}
            variant="outlined"
            color="primary"
            size="small"
          >
            Invoice
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      {selectedBooking ? (
        <Grid container spacing={3}>
          <Grid container item md={8} spacing={3}>
            <Grid item xs={12}>
              <MUIDataTable
                title={"Booking Items"}
                data={selectedBooking.bookingItems}
                columns={columns}
                options={options}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingPageRightPanels />
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </AdminLayout>
  );
};

export default BookingPage;
