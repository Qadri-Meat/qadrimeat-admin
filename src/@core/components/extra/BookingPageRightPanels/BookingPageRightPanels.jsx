import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import Message from "@core/components/ui/Message";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, updateBooking } from "store/booking";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
const BookingPageRightPanels = () => {
  const dispatch = useDispatch();
  const selectedBooking = useSelector(
    (state) => state.booking.details?.shippingDetails || []
  );
  const TransectionDetails = useSelector(
    (state) => state.booking.details?.transactions || []
  );
  const details = useSelector((state) => state.booking || []);
  const [deliveryTime, setDeliveryTime] = React.useState(null);
  const [amount, setAmount] = React.useState(null);

  React.useEffect(() => {
    if (selectedBooking && !deliveryTime) {
      const date = new Date(selectedBooking.deliveryTime);
      setDeliveryTime(date);
    }
  }, [dispatch, selectedBooking, deliveryTime]);

  const submitHandler = () => {
    if (details.status === "pending") {
      dispatch(
        updateBooking(selectedBooking.id, {
          status: "approved",
          approvedAt: new Date(),
        })
      );
    } else if (details.status === "approved") {
      dispatch(
        updateBooking(selectedBooking.id, {
          status: "delivered",
          deliveredAt: new Date(),
        })
      );
    }
  };

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
              {selectedBooking ? (
                <>
                  <p>
                    <strong>Name: </strong> {selectedBooking.firstName}{" "}
                    {selectedBooking.lastName}
                  </p>
                  <p>
                    <strong>Phone: </strong>{" "}
                    <a href={`tel:${selectedBooking.phone}`}>
                      {selectedBooking.phone}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedBooking.address},{" "}
                    {selectedBooking.city} {selectedBooking.postalCode},{" "}
                    {selectedBooking.country}
                  </p>
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Grid container>
              <Grid item container justify="space-around">
                {details.status === "delivered" ? (
                  <Message severity="success">
                    Delivered at{" "}
                    {new Date(details.deliveredAt).toLocaleDateString()},{" "}
                    {new Date(details.deliveredAt).toLocaleTimeString()}
                  </Message>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={submitHandler}
                    >
                      {selectedBooking === "approved"
                        ? "Mark Delivered"
                        : "Mark Approved"}
                    </Button>
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
              {TransectionDetails && TransectionDetails.length > 0 ? (
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
                  {TransectionDetails.map((tran) => (
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
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            deleteTransaction(selectedBooking.id, tran.id)
                          );
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
                      <span>{TransectionDetails.totalPaid}</span>
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
                      endAdornment: <Button endIcon={<SaveIcon />}>Add</Button>,
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
