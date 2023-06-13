import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking } from "store/booking";
import { addAllToCart } from "store/cart";
import withAuth from "hooks/withAuth";
import OrderForm from "./components/OrderForm";

const UpdateOrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { success, selectedOrder } = useSelector((state) => state.order);
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate(`/orders/${id}`);
    } else if (!selectedOrder) {
      dispatch(getBooking(id));
    } else if (selectedOrder) {
      dispatch(addAllToCart(selectedOrder.orderItems));
    }
  }, [navigate, success, id, selectedOrder, dispatch]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Update Order
          </Typography>
        </Grid>
      </Grid>
      <div>
        {selectedOrder ? <OrderForm preloadedValues={selectedOrder} /> : <></>}
      </div>
    </AdminLayout>
  );
};

export default withAuth(UpdateOrderPage);
