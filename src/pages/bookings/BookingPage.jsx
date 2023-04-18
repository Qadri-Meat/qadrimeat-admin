import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { getBooking } from "store/booking";

const BookingPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const bookingItems = useSelector(
    (state) => state.booking.details?.bookingItems || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser && bookingItems.length === 0) {
      dispatch(getBooking(id));
    } else if (!authUser) {
      navigate("/login");
    }
  }, [authUser, dispatch, id, navigate, bookingItems]);

  const columns = [
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
      },
    },
    {
      name: "time",
      label: "Time",
      options: {
        filter: true,
        sort: false,
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
  ];

  console.log(bookingItems); // Moved console.log here

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
            onClick={() =>
              navigate(`/bookings/invoice/${"628fc4e85c35f151989bc238"}`)
            }
            variant="outlined"
            color="primary"
            size="small"
          >
            Invoice
          </Button>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      <div>
        <Grid container spacing={3}>
          <Grid container item md={8} spacing={3}>
            <Grid item xs={12}>
              <MUIDataTable
                title={"Booking Items"}
                data={bookingItems}
                columns={columns}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </AdminLayout>
  );
};

export default BookingPage;
