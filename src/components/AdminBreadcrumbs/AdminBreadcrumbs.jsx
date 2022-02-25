import React from 'react';
import { Breadcrumbs, Link, Typography, makeStyles } from '@material-ui/core';
import NavLinkAdapter from '../NavLinkAdapter/NavLinkAdapter';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
  },
}));

const AdminBreadcrumbs = (props) => {
  const { path } = props;
  const classes = useStyles();

  const pathName = path.location.pathname.split('/');
  const lastRoute = pathName.splice(-1, 1);

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathName.length > 0 &&
          pathName.map((item, index) => (
            <Link
              key={index}
              component={NavLinkAdapter}
              to={pathName.join('/')}
              activeClassName="active"
              exact={true}
              color="inherit"
            >
              {item === '' ? 'dashboard' : item}
            </Link>
          ))}
        <Typography color="textPrimary">{lastRoute.toString()}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default AdminBreadcrumbs;
