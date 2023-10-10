import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Divider, Grid, TextField } from '@mui/material';
import Message from '@core/components/ui/Message';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '@core/components/ui/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addTransaction,
  deleteTransaction,
  getOrder,
  updateOrder,
} from 'store/order';
import EditOrderDetailsDialog from 'pages/orders/components/EditOrderDetailsDialog';

const OrderPageRightPanels = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedOrder, loading } = useSelector(
    (state) => state.order
  );
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [amount, setAmount] = useState(0);
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [showTransactionField, setShowTransactionField] =
    useState(true); // Add state to control transaction field visibility

  useEffect(() => {
    if (selectedOrder && !deliveryTime) {
      const date = new Date(selectedOrder.deliveryTime);
      setDeliveryTime(date);
    }
  }, [dispatch, selectedOrder, deliveryTime]);

  const submitHandler = async () => {
    if (selectedOrder.status === 'pending') {
      dispatch(
        updateOrder({
          id: selectedOrder.id,
          data: {
            status: 'approved',
            approvedAt: new Date(),
          },
        })
      );
      setShowTransactionField(false);
    }
  };

  const handleCreateTransaction = async () => {
    await dispatch(
      addTransaction({
        id: selectedOrder.id,
        data: {
          amount,
          paymentMethod: 'cash',
        },
      })
    );
    setAmount('');
    dispatch(getOrder(id));
  };

  if (!selectedOrder) {
    return <Loader />;
  }

  return (
    <div>
      <Accordion
        defaultExpanded
        sx={{ marginBottom: '1.3rem' }}
        disabled={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          IconButtonProps={{
            onClick: () => {},
          }}
        >
          <Typography>Shipping</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Grid container>
            <Grid item>
              {selectedOrder && (
                <>
                  <p>
                    <strong>Name: </strong>{' '}
                    {selectedOrder.shippingDetails?.firstName}{' '}
                    {selectedOrder.shippingDetails?.lastName}
                  </p>
                  <p>
                    <strong>Phone: </strong>{' '}
                    <a href={`tel:${selectedOrder.phone}`}>
                      {selectedOrder.phone}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>{' '}
                    {selectedOrder.shippingDetails?.address}{' '}
                    {selectedOrder.shippingDetails?.city}{' '}
                    {selectedOrder.shippingDetails?.postalCode}{' '}
                    {selectedOrder.shippingDetails?.country}
                  </p>
                </>
              )}
            </Grid>
            <Grid container>
              <Grid item container justify="space-around">
                {selectedOrder &&
                selectedOrder.status === 'approved' ? (
                  <Message severity="success">
                    Approved at{' '}
                    {new Date(
                      selectedOrder.approvedAt
                    ).toLocaleDateString()}
                  </Message>
                ) : (
                  <>
                    <Button
                      style={{ paddingRight: '10px' }}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setShowEditDetails(true);
                      }}
                    >
                      Edit Details
                    </Button>
                    {loading ? (
                      <Loader />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={submitHandler}
                        style={{ marginLeft: '10px' }}
                      >
                        {selectedOrder &&
                        selectedOrder.status === 'approved'
                          ? 'Mark Delivered'
                          : 'Mark Approved'}
                      </Button>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {showTransactionField && (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Transactions</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12}>
                {selectedOrder &&
                selectedOrder.transactions.length > 0 ? (
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
                      <p>
                        <strong></strong>
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
                          {new Date(
                            tran.createdAt
                          ).toLocaleDateString()}
                          ,{' '}
                          {new Date(
                            tran.createdAt
                          ).toLocaleTimeString()}
                        </p>
                        <p>{tran.amount}</p>
                        <Button
                          endIcon={<DeleteIcon />}
                          onClick={async (e) => {
                            e.preventDefault();
                            await dispatch(
                              deleteTransaction({
                                id1: selectedOrder.id,
                                id2: tran.id,
                              })
                            );
                            dispatch(getOrder(id));
                          }}
                        ></Button>
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
                            selectedOrder.totalPrice -
                            selectedOrder.totalPaid
                          ).toFixed(2)}
                        </span>
                      </p>
                    </Box>
                  </div>
                ) : (
                  <>No Transactions found</>
                )}
                <>
                  {selectedOrder.totalPaid <
                  selectedOrder.totalPrice ? (
                    <TextField
                      id="amount"
                      label="Amount"
                      type="number"
                      value={amount === null ? 0 : amount}
                      onChange={(e) => {
                        if (
                          selectedOrder.totalPrice -
                            selectedOrder.totalPaid >=
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
          </AccordionDetails>
        </Accordion>
      )}

      <EditOrderDetailsDialog
        show={showEditDetails}
        setShow={setShowEditDetails}
        id={selectedOrder.id}
        preloadedValues={selectedOrder.shippingDetails}
      />
    </div>
  );
};

export default OrderPageRightPanels;
