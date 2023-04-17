import AdminBreadcrumbs from "@core/components/admin/AdminBreadcrumbs/AdminBreadcrumbs";
import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDeals } from "store/deal";

const AllBookingItemsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingItems } = useSelector((state) => state.booking);
  const { results } = useSelector((state) => state.deal);
  const { user: authUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authUser) {
      dispatch(getDeals(""));
    } else {
      navigate("/login");
    }
  }, [navigate, authUser, dispatch]);

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
          <InputLabel id="deal-label">Deal</InputLabel>
          {results && results.length > 0 ? (
            <Select
              labelId="deal-label"
              id="deal"
              name="deal"
              variant="outlined"
              label="Deal"
              style={{ width: "300px" }}
            >
              {results.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          ) : (
            <></>
          )}
          <ToggleButtonGroup color="primary" size="small" exclusive>
            <ToggleButton value="1">Day 1</ToggleButton>
            <ToggleButton value="2">Day 2</ToggleButton>
            <ToggleButton value="3">Day 3</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </FormControl>
    </AdminLayout>
  );
};

export default AllBookingItemsPage;
