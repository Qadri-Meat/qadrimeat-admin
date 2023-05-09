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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  textField: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const Profile = () => {
  const location = useLocation();
  const { id } = pick(location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { user: authUser } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.user.details);
  useEffect(() => {
    if (authUser) {
      dispatch(getUser(id));
    } else {
      navigate("/login");
    }
  }, [authUser, dispatch, navigate, id]);
  return (
    <AdminLayout>
      <Grid container spacing={3}>
        <Grid container item md={4} spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Profile Details
              </Typography>
              {data ? (
                <>
                  <Avatar src="/broken-image.jpg" />
                  <Typography gutterBottom>{data.name}</Typography>
                  <Typography gutterBottom>{data.email}</Typography>
                  <Typography variant="h6" gutterBottom>
                    {data.role}
                  </Typography>
                </>
              ) : (
                <Typography gutterBottom>No data available</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          {data ? (
            <UserForm defaultValues={data} />
          ) : (
            <Typography gutterBottom>No data available</Typography>
          )}
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Profile;
