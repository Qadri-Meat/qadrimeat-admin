import { Autocomplete, Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const BookingItem = () => {
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
    </Grid>
  );
};

export default BookingItem;
