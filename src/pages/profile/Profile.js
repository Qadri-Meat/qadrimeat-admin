import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import UserForm from "pages/users/components/UserForm";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "store/user";
import { pick } from "helper/pick";
import withAuth from "hooks/withAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: theme.spacing(15),
    width: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
}));

const Profile = () => {
  const location = useLocation();
  const { id } = pick(location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { details, success } = useSelector((state) => state.user);

  useEffect(() => {
    if (success) {
      navigate(`/profile?id=${id}`);
    }
  }, [navigate, id, success]);
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);
  return (
    <AdminLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            className={classes.paper}
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <Avatar
              alt={details?.name}
              src="/broken-image.jpg"
              className={classes.avatar}
              style={{ width: "150px", height: "150px", marginBottom: "1rem" }}
            />
            {details ? (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                >
                  {details.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  style={{ color: "#757575", marginBottom: "1rem" }}
                >
                  {details.role}
                </Typography>
                <Typography gutterBottom>{details.email}</Typography>
              </>
            ) : (
              <Typography gutterBottom>No data available</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {details ? (
            <UserForm defaultValues={details} />
          ) : (
            <Typography gutterBottom>No data available</Typography>
          )}
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default withAuth(Profile);
