import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBooking } from "store/booking";
import MUIDataTable from "mui-datatables";
const BookingPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.booking);
  const { user: authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (authUser) {
      dispatch(getBooking("628fc4e85c35f151989bc238"));
    } else {
      navigate("/login");
    }
  }, [navigate, authUser, dispatch]);

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
            onClick={() => navigate("/bookings/update-booking/:id")}
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
        {data ? (
          <Grid container spacing={3}>
            <Grid container item md={8} spacing={3}>
              <Grid item xs={12}>
                <MUIDataTable
                  title={"Booking Items"}
                  // data={data.details.bookingItems}
                  columns={columns}
                />
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </div>
    </AdminLayout>
  );
};

export default BookingPage;
