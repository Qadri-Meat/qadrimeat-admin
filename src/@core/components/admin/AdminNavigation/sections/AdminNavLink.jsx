import React from "react";
import { ListItem, ListItemIcon, ListItemText, Icon } from "@mui/material";
import AdminNavBadge from "../AdminNavBadge";

const AdminNavLink = (props) => {
  const { item } = props;
  return (
    <ListItem
      button
      component="a"
      href={item.url}
      target={item.target ? item.target : "_blank"}
    >
      {item.icon && (
        <ListItemIcon>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
      )}
      <ListItemText primary={item.title} />
      {item.badge && <AdminNavBadge className="mr-4" badge={item.badge} />}
    </ListItem>
  );
};

export default AdminNavLink;
