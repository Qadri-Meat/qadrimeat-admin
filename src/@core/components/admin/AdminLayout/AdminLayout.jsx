import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@mui/styles";

import Layout from "layouts/Layout";
import LayoutContext from "context/LayoutContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function AdminLayout(props) {
  const classes = useStyles(props);

  return (
    <LayoutContext.Provider value={{ content: props.children }}>
      <div className={classes.root}>
        <CssBaseline />
        <Layout />
      </div>
    </LayoutContext.Provider>
  );
}

AdminLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default AdminLayout;
