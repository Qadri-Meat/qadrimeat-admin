import React, { useEffect } from 'react';
import AdminLayout from 'components/AdminLayout/AdminLayout';
import AdminBreadcrumbs from 'components/AdminBreadcrumbs/AdminBreadcrumbs';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  Typography,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import { getBookingItems } from 'state/ducks/booking/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getDeals } from 'state/ducks/deal/actions';
import { pick } from 'helpers/pick';
const useStyles = makeStyles((theme) => ({
  my3: {
    margin: '1.3rem 0',
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: '.85rem',
  },
  mLeft: {
    marginRight: '.85rem',
  },
  p1: {
    padding: '.85rem',
  },
}));

const AllBookingItemsPage = (props) => {
  const { history, location } = props;
  const { day = '1', deal } = pick(location.search);

  const classes = useStyles();

  const dispatch = useDispatch();

  const { bookingItems } = useSelector((state) => state.booking);
  const { results } = useSelector((state) => state.deal);

  const { user: authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser) {
      dispatch(getBookingItems(day, deal));
      dispatch(getDeals(1, 100));
    } else {
      history.push('/login');
    }
  }, [history, authUser, dispatch, day, deal]);

  return (
    <AdminLayout>
      <Grid container className={classes.my3} alignItems="center">
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          xs={10}
        >
          <Grid item className={classes.mRight}>
            <Typography variant="h5" component="h1">
              Booking Items
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <AdminBreadcrumbs path={history} />

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
              value={deal}
              label="Deal"
              style={{ width: '300px' }}
              onChange={(event) => {
                history.push(
                  `/bookings/booking-items?day=${day}&deal=${event.target.value}`
                );
              }}
            >
              {results.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          ) : (
            <></>
          )}
          <ToggleButtonGroup
            color="primary"
            value={day}
            size="small"
            exclusive
            onChange={(event, value) => {
              history.push(
                `/bookings/booking-items?day=${value}${
                  deal ? `&deal=${deal}` : ''
                }`
              );
            }}
          >
            <ToggleButton value="1">Day 1</ToggleButton>
            <ToggleButton value="2">Day 2</ToggleButton>
            <ToggleButton value="3">Day 3</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </FormControl>
      <TableContainer>
        <Table
          className={classes.table}
          style={{ tableLayout: 'fixed' }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Deal</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          {bookingItems && bookingItems.length > 0 ? (
            <TableBody>
              {bookingItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.deal}
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

export default AllBookingItemsPage;
