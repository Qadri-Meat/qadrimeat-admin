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
import { updateOrder } from 'state/ducks/order/actions';
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

export default function OrderPageRightPanels() {
  const [expanded, setExpanded] = React.useState(true);

  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedOrder, loading } = useSelector((state) => state.order);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (selectedOrder && !deliveryTime) {
      const date = new Date(selectedOrder.deliveryTime);
      setDeliveryTime(date);
    }
  }, [dispatch, selectedOrder, deliveryTime]);

  const handleExpandedChange = () => {
    setExpanded(!expanded);
  };
  const handleCreateTransaction = () => {
    dispatch(
      createTransaction({
        order: selectedOrder.id,
        amount,
        paymentMethod: 'cash',
      })
    );
    setAmount('');
  };

  const submitHandler = () => {
    if (selectedOrder.status === 'pending') {
      dispatch(
        updateOrder(selectedOrder.id, {
          status: 'approved',
          approvedAt: new Date(),
        })
      );
    } else if (selectedOrder.status === 'approved') {
      dispatch(
        updateOrder(selectedOrder.id, {
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
              {selectedOrder && selectedOrder.shippingDetails ? (
                <>
                  <p>
                    <strong>Name: </strong>{' '}
                    {selectedOrder.shippingDetails.firstName}{' '}
                    {selectedOrder.shippingDetails.lastName}
                  </p>
                  <p>
                    <strong>Phone: </strong>{' '}
                    <a href={`tel:${selectedOrder.phone}`}>
                      {selectedOrder.phone}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>{' '}
                    {selectedOrder.shippingDetails.address},{' '}
                    {selectedOrder.shippingDetails.city}{' '}
                    {selectedOrder.shippingDetails.postalCode},{' '}
                    {selectedOrder.shippingDetails.country}
                  </p>
                  {deliveryTime ? (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDateTimePicker
                        id="time-picker"
                        label="Delivery Time"
                        style={{ width: '250px' }}
                        value={deliveryTime}
                        onChange={(date) => {
                          dispatch(
                            updateOrder(selectedOrder.id, {
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
                    {/* {new Date(selectedOrder.deliveryTime).toLocaleDateString()},{' '}
                    {new Date(selectedOrder.deliveryTime).toLocaleTimeString()},{' '} */}
                    <strong>Minutes Remaining:</strong> (
                    {(
                      (new Date(selectedOrder.deliveryTime) - new Date()) /
                      60000
                    ).toFixed() > 0
                      ? (
                          (new Date(selectedOrder.deliveryTime) - new Date()) /
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
                {selectedOrder.status === 'delivered' ? (
                  <Message severity="success">
                    Delivered at{' '}
                    {new Date(selectedOrder.deliveredAt).toLocaleDateString()},{' '}
                    {new Date(selectedOrder.deliveredAt).toLocaleTimeString()}
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
                        {selectedOrder.status === 'approved'
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
              {selectedOrder && selectedOrder.transactions.length > 0 ? (
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
                  {selectedOrder.transactions.map((tran) => (
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
                      <span>{selectedOrder.totalPaid}</span>
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
                          selectedOrder.totalPrice - selectedOrder.totalPaid
                        ).toFixed(2)}
                      </span>
                    </p>
                  </Box>
                </div>
              ) : (
                <>No Transactions found</>
              )}
              <>
                {selectedOrder.totalPaid < selectedOrder.totalPrice ? (
                  <TextField
                    id="amount"
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      if (
                        selectedOrder.totalPrice - selectedOrder.totalPaid >=
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
