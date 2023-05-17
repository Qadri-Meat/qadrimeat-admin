import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

import AdminNavBadge from "../AdminNavBadge";
import NavLinkAdapter from "@core/components/admin/NavLinkAdapter/NavLinkAdapter";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  active: {
    color: "#fff",

    // // borderRadius: "10px 0 0 10px"
  },
}));

const AdminNavItem = (props) => {
  const classes = useStyles();
  const { item } = props;

  return (
    <ListItem
      component={NavLinkAdapter}
      to={item.url}
      className={classes.active}
      exact={item.exact}
    >
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.title} />
      {item.badge && <AdminNavBadge className="mr-4" badge={item.badge} />}
    </ListItem>
  );
};

export default AdminNavItem;
