import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const LoadingButton = (props) => {
  const { classes, loading, ...other } = props;

  if (loading) {
    return (
      <Button className={classes.button} {...other}>
        <CircularProgress />
      </Button>
    );
  } else {
    return <Button className={classes.button} {...other} />;
  }
};

LoadingButton.defaultProps = {
  loading: false,
};

LoadingButton.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default withStyles(styles)(LoadingButton);
