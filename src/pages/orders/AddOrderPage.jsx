import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import withAuth from "hooks/withAuth";
import { getProducts } from "store/product";

const AddOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success, selectedOrder } = useSelector((state) => state.order);
  const { results } = useSelector((state) => state.product);

  useEffect(() => {
    const query = `limit=${100}&page=${1}`;
    dispatch(getProducts(query));
    if (success) {
      navigate(`/orders/${selectedOrder.id}`);
    }
  }, [success, dispatch, navigate, selectedOrder]);

  return (
    <AdminLayout>
      <Grid container sx={{ my: 3 }} alignItems="center">
        <Grid item>
          <Typography variant="h5" component="h1">
            Add New Order
          </Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ my: 3 }} alignItems="center" spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            {results.map((product) => (
              <Grid item xs={3} key={product.id}>
                <Card sx={{ maxWidth: 200 }}>
                  <CardMedia
                    sx={{ height: 70, margin: 2 }}
                    image={"/meat.png"}
                    title={product.title}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      PKR: {product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 200 }}>
            {/* Cart card content goes here */}
          </Card>
        </Grid>
      </Grid>

      {/* <div>
        <OrderForm />
      </div> */}
    </AdminLayout>
  );
};

export default withAuth(AddOrderPage);
