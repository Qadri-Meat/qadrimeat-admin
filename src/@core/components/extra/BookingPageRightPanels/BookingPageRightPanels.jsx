import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Grid } from "@mui/material";
import Message from "@core/components/ui/Message";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "store/booking";

const BookingPageRightPanels = () => {
  const dispatch = useDispatch();
  const selectedBooking = useSelector(
    (state) => state.booking.details?.shippingDetails || []
  );
  const [deliveryTime, setDeliveryTime] = React.useState(null);
  React.useEffect(() => {
    console.log("Selected booking details is: ", selectedBooking.firstName);
    if (selectedBooking && !deliveryTime) {
      const date = new Date(selectedBooking.deliveryTime);
      setDeliveryTime(date);
    }
  }, [dispatch, selectedBooking, deliveryTime]);

  const submitHandler = () => {
    if (selectedBooking.status === "pending") {
      dispatch(
        updateBooking(selectedBooking.id, {
          status: "approved",
          approvedAt: new Date(),
        })
      );
    } else if (selectedBooking.status === "approved") {
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
      <Accordion sx={{ marginBottom: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Shipping</Typography>
        </AccordionSummary>
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
                {selectedBooking === "delivered" ? (
                  <Message severity="success">
                    Delivered at{" "}
                    {new Date(selectedBooking.deliveredAt).toLocaleDateString()}
                    ,{" "}
                    {new Date(selectedBooking.deliveredAt).toLocaleTimeString()}
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Transactions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BookingPageRightPanels;
