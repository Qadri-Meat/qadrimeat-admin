import React from "react";

import AdminNavCollapse from "./AdminNavCollapse";
import AdminNavItem from "./AdminNavItem";
import AdminNavLink from "./AdminNavLink";
import { ListSubheader } from "@mui/material";

const AdminNavGroup = (props) => {
  const { item } = props;

  return (
    <>
      <ListSubheader>{item.title}</ListSubheader>

      {item.children && (
        <React.Fragment>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "group" && <NavGroup item={item} />}

              {item.type === "collapse" && <AdminNavCollapse item={item} />}

              {item.type === "item" && <AdminNavItem item={item} />}

              {item.type === "link" && <AdminNavLink item={item} />}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </>
  );
};

const NavGroup = React.memo(AdminNavGroup);

export default NavGroup;
