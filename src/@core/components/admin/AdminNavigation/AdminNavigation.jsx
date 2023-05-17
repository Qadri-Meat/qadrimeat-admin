import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { makeStyles } from "@mui/styles";

import navigation from "navigation";

import AdminNavGroup from "./sections/AdminNavGroup";
import AdminNavCollapse from "./sections/AdminNavCollapse";
import AdminNavItem from "./sections/AdminNavItem";
import AdminNavLink from "./sections/AdminNavLink";
import { Typography } from "@mui/material";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  logo: {
    padding: "1rem",
    "& span": {
      display: "block",
      color: "rgba(41, 113, 245, 0.87)",
    },
  },
  navCustom: {
    "& .MuiTypography-root": {
      fontSize: ".85rem",
    },
    "& .MuiListItemIcon-root": {
      minWidth: "35px",
    },
    "& .MuiCollapse-wrapperInner a": {
      paddingLeft: "50px",
    },
  },
}));

const AdminNavigation = (props) => {
  const classes = useStyles(props);

  return (
    <div>
      <div className={clsx(classes.toolbar, classes.logoBg)}>
        <Typography
          variant="h6"
          component="h1"
          align="center"
          className={classes.logo}
        >
          &copy; QadriMeat
          <br />
          <span>Admin</span>
        </Typography>
      </div>
      <Divider />
      <List className={classes.navCustom}>
        {navigation.map((item) => (
          <React.Fragment key={item.id}>
            {item.type === "group" && <AdminNavGroup item={item} />}

            {item.type === "collapse" && <AdminNavCollapse item={item} />}

            {item.type === "item" && <AdminNavItem item={item} />}

            {item.type === "link" && <AdminNavLink item={item} />}

            {item.type === "divider" && <Divider className="my-16" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default AdminNavigation;
