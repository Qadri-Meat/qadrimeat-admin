import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavLinkAdapter from "@core/components/admin/NavLinkAdapter/NavLinkAdapter";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
}));

const AdminBreadcrumbs = () => {
  const location = useLocation();
  const classes = useStyles();

  const pathName = location.pathname.split("/");
  const lastRoute = pathName.splice(-1, 1);

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathName.length > 0 &&
          pathName.map(
            (item, index) =>
              item !== "" && (
                <Link
                  key={index}
                  component={NavLinkAdapter}
                  to={pathName.join("/")}
                  className="active"
                  exact={"true"}
                  color="inherit"
                >
                  {item === "" ? "dashboard" : item}
                </Link>
              )
          )}
        <Typography color="textPrimary">{lastRoute.toString()}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default AdminBreadcrumbs;
