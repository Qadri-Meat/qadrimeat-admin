import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid, Button, Divider } from '@material-ui/core';
import Message from 'components/Message/Message';
import { updateOrder } from 'state/ducks/order/actions';
import Loader from 'components/Loader/Loader';

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

  const handleExpandedChange = () => {
    setExpanded(!expanded);
  };
  const submitHandler = () => {
    dispatch(
      updateOrder(selectedOrder.id, {
        isDelivered: true,
        deliveredAt: new Date(),
      })
    );
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
              {selectedOrder ? (
                <>
                  <p>
                    <strong>Name: </strong> {selectedOrder.shippingDetails.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${selectedOrder.email}`}>
                      {selectedOrder.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {selectedOrder.shippingDetails.address},{' '}
                    {selectedOrder.shippingDetails.city}{' '}
                    {selectedOrder.shippingDetails.postalCode},{' '}
                    {selectedOrder.shippingDetails.country}
                  </p>
                </>
              ) : (
                <></>
              )}
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
          <Typography className={classes.heading}>Payment</Typography>
        </ExpansionPanelSummary>

        <Divider />
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item>
              {selectedOrder ? (
                <>
                  <p>
                    <strong>Name: </strong> {selectedOrder.paymentResult.id}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a
                      href={`mailto:${selectedOrder.paymentResult.emailAddress}`}
                    >
                      {selectedOrder.paymentResult.emailAddress}
                    </a>
                  </p>
                  <p>
                    <strong>Status: </strong>{' '}
                    {selectedOrder.paymentResult.status}
                  </p>
                  <p>
                    <strong>Paid At: </strong> {selectedOrder.paidAt}
                  </p>
                </>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Grid container>
        <Grid item container justify="space-around">
          {selectedOrder.isDelivered ? (
            <Message severity="success">
              Delivered on {selectedOrder.deliveredAt}
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
                  Mark Delivered
                </Button>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
