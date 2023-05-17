import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Message from "@core/components/ui/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
  getBooking,
  updateBooking,
} from "store/booking";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@core/components/ui/Loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const BookingPageRightPanels = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBooking, loading } = useSelector((state) => state.booking);
  const [deliveryTime, setDeliveryTime] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  useEffect(() => {
    if (selectedBooking && !deliveryTime) {
      const date = new Date(selectedBooking.deliveryTime);
      setDeliveryTime(date);
    }
  }, [dispatch, selectedBooking, deliveryTime]);
  const submitHandler = async () => {
    if (selectedBooking.status === "pending") {
      await dispatch(
        updateBooking({
          id: selectedBooking.id,
          data: {
            status: "approved",
            approvedAt: new Date(),
          },
        })
      );
      dispatch(getBooking(id));
    }
  };
  const handleCreateTransaction = async () => {
    await dispatch(
      addTransaction({
        id: selectedBooking.id,
        data: {
          amount,
          paymentMethod: "cash",
        },
      })
    );
    setAmount("");
    dispatch(getBooking(id));
  };
  if (!selectedBooking) {
    return <Loader />;
  }
  return (
    <div>
      <Accordion defaultExpanded sx={{ marginBottom: "1.3rem" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Shipping</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Grid container>
            <Grid item>
              {selectedBooking && selectedBooking.shippingDetails ? (
                <>
                  <p>
                    <strong>Name: </strong>{" "}
                    {selectedBooking.shippingDetails.firstName}{" "}
                    {selectedBooking.shippingDetails.lastName}
                  </p>
                  <p>
                    <strong>Phone: </strong>{" "}
                    <a href={`tel:${selectedBooking.phone}`}>
                      {selectedBooking.phone}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {selectedBooking.shippingDetails.address},{" "}
                    {selectedBooking.shippingDetails.city}{" "}
                    {selectedBooking.shippingDetails.postalCode},{" "}
                    {selectedBooking.shippingDetails.country}
                  </p>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Grid container>
              <Grid item container justify="space-around">
                {selectedBooking && selectedBooking.status === "approved" ? (
                  <Message severity="success">
                    Approved at{" "}
                    {new Date(selectedBooking.approvedAt).toLocaleDateString()}
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
                        {selectedBooking &&
                        selectedBooking.status === "approved"
                          ? "Mark Delivered"
                          : "Mark Approved"}
                      </Button>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
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
              {selectedBooking && selectedBooking.transactions.length > 0 ? (
                <div style={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
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
                  {selectedBooking.transactions.map((tran) => (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        {new Date(tran.createdAt).toLocaleDateString()},{" "}
                        {new Date(tran.createdAt).toLocaleTimeString()}
                      </p>
                      <p>{tran.amount}</p>
                      <Button
                        endIcon={<DeleteIcon />}
                        onClick={async (e) => {
                          e.preventDefault();
                          await dispatch(
                            deleteTransaction({
                              id1: selectedBooking.id,
                              id2: tran.id,
                            })
                          );
                          dispatch(getBooking(id));
                        }}
                      ></Button>
                    </Box>
                  ))}
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
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
                      display: "flex",
                      justifyContent: "space-between",
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
                          {loading ? <Loader /> : "Add"}
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
    </div>
  );
};

export default BookingPageRightPanels;
