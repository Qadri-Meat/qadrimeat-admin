import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Button, Divider, Box, TextField } from '@material-ui/core';
import Message from 'components/Message/Message';
import { updateBooking } from 'state/ducks/booking/actions';
import { createTransaction } from 'state/ducks/transaction/actions';
import Loader from 'components/Loader/Loader';
import SaveIcon from '@material-ui/icons/Save';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  mb3: {
    marginBottom: '1.3rem',
  },
  mb1: {
    marginBottom: '.85rem',
  },
  my1: {
    margin: '.85rem 0',
  },
}));

export default function BookingPageRightPanels() {
  const [expanded, setExpanded] = React.useState(true);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedBooking, loading } = useSelector((state) => state.booking);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (selectedBooking && !deliveryTime) {
      const date = new Date(selectedBooking.deliveryTime);
      setDeliveryTime(date);
    }
  }, [dispatch, selectedBooking, deliveryTime]);

  const handleExpandedChange = () => {
    setExpanded(!expanded);
  };
  const handleCreateTransaction = () => {
    dispatch(
      createTransaction({
        booking: selectedBooking.id,
        amount,
        paymentMethod: 'cash',
      })
    );
    setAmount('');
  };

  const submitHandler = () => {
    if (selectedBooking.status === 'pending') {
      dispatch(
        updateBooking(selectedBooking.id, {
          status: 'approved',
          approvedAt: new Date(),
        })
      );
    } else if (selectedBooking.status === 'approved') {
      dispatch(
        updateBooking(selectedBooking.id, {
          status: 'delivered',
          deliveredAt: new Date(),
        })
      );
    }
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expanded} className={classes.mb3}>
        <ExpansionPanelSummary
          onClick={handleExpandedChange}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Shipping</Typography>
        </ExpansionPanelSummary>
        <Divider />
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item>
              {selectedBooking && selectedBooking.shippingDetails ? (
                <>
                  <p>
                    <strong>Name: </strong>{' '}
                    {selectedBooking.shippingDetails.firstName}{' '}
                    {selectedBooking.shippingDetails.lastName}
                  </p>
                  <p>
                    <strong>Phone: </strong>{' '}
                    <a href={`tel:${selectedBooking.phone}`}>
                      {selectedBooking.phone}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>{' '}
                    {selectedBooking.shippingDetails.address},{' '}
                    {selectedBooking.shippingDetails.city}{' '}
                    {selectedBooking.shippingDetails.postalCode},{' '}
                    {selectedBooking.shippingDetails.country}
                  </p>
                  {deliveryTime ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        id="time-picker"
                        label="Delivery Time"
                        style={{ width: '250px' }}
                        value={deliveryTime}
                        disabled
                        onChange={(date) => {
                          dispatch(
                            updateBooking(selectedBooking.id, {
                              deliveryTime: date,
                            })
                          );
                          setDeliveryTime(date);
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  ) : (
                    ''
                  )}

                  <p>
                    {/* {new Date(selectedBooking.deliveryTime).toLocaleDateString()},{' '}
                    {new Date(selectedBooking.deliveryTime).toLocaleTimeString()},{' '} */}
                    <strong>Minutes Remaining:</strong> (
                    {(
                      (new Date(selectedBooking.deliveryTime) - new Date()) /
                      60000
                    ).toFixed() > 0
                      ? (
                          (new Date(selectedBooking.deliveryTime) -
                            new Date()) /
                          60000
                        ).toFixed()
                      : '0'}
                    )
                  </p>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Grid container>
              <Grid item container justify="space-around">
                {selectedBooking.status === 'delivered' ? (
                  <Message severity="success">
                    Delivered at{' '}
                    {new Date(selectedBooking.deliveredAt).toLocaleDateString()}
                    ,{' '}
                    {new Date(selectedBooking.deliveredAt).toLocaleTimeString()}
                  </Message>
                ) : (
                  <>
                    {loading ? (
                      <Loader />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={submitHandler}
                      >
                        {selectedBooking.status === 'approved'
                          ? 'Mark Delivered'
                          : 'Mark Approved'}
                      </Button>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded} className={classes.mb3}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Transactions</Typography>
        </ExpansionPanelSummary>

        <Divider />
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              {selectedBooking && selectedBooking.transactions.length > 0 ? (
                <div style={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p>
                      <strong>Date</strong>
                    </p>
                    <p>
                      <strong>Amount</strong>
                    </p>
                  </Box>
                  {selectedBooking.transactions.map((tran) => (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <p>
                        {new Date(tran.createdAt).toLocaleDateString()},{' '}
                        {new Date(tran.createdAt).toLocaleTimeString()}
                      </p>
                      <p>{tran.amount}</p>
                    </Box>
                  ))}
                  <Divider />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p>
                      <strong>Total Paid: </strong>
                    </p>
                    <p>
                      <span>{selectedBooking.totalPaid}</span>
                    </p>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p>
                      <strong>Balance: </strong>
                    </p>
                    <p>
                      <span>
                        {(
                          selectedBooking.totalPrice - selectedBooking.totalPaid
                        ).toFixed(2)}
                      </span>
                    </p>
                  </Box>
                </div>
              ) : (
                <>No Transactions found</>
              )}
              <>
                {selectedBooking.totalPaid < selectedBooking.totalPrice ? (
                  <TextField
                    id="amount"
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      if (
                        selectedBooking.totalPrice -
                          selectedBooking.totalPaid >=
                        e.target.value
                      ) {
                        setAmount(e.target.value);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <Button
                          endIcon={<SaveIcon />}
                          onClick={handleCreateTransaction}
                        >
                          {loading ? <Loader /> : 'Add'}
                        </Button>
                      ),
                    }}
                  />
                ) : (
                  <></>
                )}
              </>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
