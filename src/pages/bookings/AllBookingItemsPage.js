import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { pick } from "helper/pick";
import withAuth from "hooks/withAuth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookingItems } from "store/booking";
import { getDeals } from "store/deal";

const AllBookingItemsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { day = "1", deal } = pick(location.search);

  const { bookingItems } = useSelector((state) => state.booking);
  const { results } = useSelector((state) => state.deal);

  useEffect(() => {
    dispatch(getBookingItems({ day, deal }));
    dispatch(getDeals());
  }, [navigate, dispatch, day, deal]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          xs={10}
        >
          <Grid item>
            <Typography variant="h5" component="h1">
              Booking Items (
              {bookingItems
                ? bookingItems.reduce(
                    (partialSum, a) => partialSum + a.quantity,
                    0
                  )
                : 0}
              )
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <AdminBreadcrumbs />
      <FormControl fullWidth size="small">
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          xs={12}
          spacing={1}
        >
          {results && results.length > 0 && (
            <>
              <InputLabel id="deal-label">Deal</InputLabel>
              <Select
                labelId="deal-label"
                id="deal"
                name="deal"
                variant="outlined"
                label="Deal"
                style={{ width: "300px" }}
                onChange={(event) => {
                  navigate(
                    `/bookings/booking-items?day=${day}&deal=${event.target.value}`
                  );
                }}
              >
                {results.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
          <ToggleButtonGroup
            onChange={(event, value) => {
              navigate(
                `/bookings/booking-items?day=${value}${
                  deal ? `&deal=${deal}` : ""
                }`
              );
            }}
            value={day}
            color="primary"
            size="small"
            exclusive
          >
            <ToggleButton value="1">Day 1</ToggleButton>
            <ToggleButton value="2">Day 2</ToggleButton>
            <ToggleButton value="3">Day 3</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </FormControl>

      <TableContainer>
        <Table style={{ tableLayout: "fixed" }} aria-label="simple table">
          <TableRow>
            <TableCell>Booking</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Time</TableCell>
          </TableRow>
          {bookingItems && bookingItems.length > 0 ? (
            <TableBody>
              {bookingItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    <Button
                      onClick={() => navigate(`/bookings/${item.id}`)}
                      variant="outlined"
                      color="primary"
                      size="small"
                    >
                      Open Booking
                    </Button>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>No Items</TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </AdminLayout>
  );
};

export default withAuth(AllBookingItemsPage);
