import AdminLayout from "@core/components/admin/AdminLayout/AdminLayout";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
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
  const classes = useStyles();
  return (
    <AdminLayout>
      <Grid container spacing={3}>
        <Grid container item md={4} spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Profile Details
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Update Profile
            </Typography>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Save
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Profile;
