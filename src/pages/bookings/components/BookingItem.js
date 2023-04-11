import { Autocomplete, Grid, TextField } from "@mui/material";
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
        <MUIDataTable title={"Booking Items"} />
      </Grid>
    </Grid>
  );
};

export default BookingItem;
