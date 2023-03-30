import React from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";

import AdminNavigation from "@core/components/admin/AdminNavigation/AdminNavigation";
import NavigationContext from "context/NavigationContext";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
    "& *": {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
}));

const AdminDrawer = (props) => {
  const classes = useStyles(props);
  const { open } = React.useContext(NavigationContext);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <AdminNavigation />
    </Drawer>
  );
};

export default AdminDrawer;
