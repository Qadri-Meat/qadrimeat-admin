import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import navigationConfig from '../../configs/navigationConfig';

import AdminNavGroup from './sections/AdminNavGroup';
import AdminNavCollapse from './sections/AdminNavCollapse';
import AdminNavItem from './sections/AdminNavItem';
import AdminNavLink from './sections/AdminNavLink';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  logoBg: {
    backgroundColor: theme.palette.type !== 'dark' && '#18202c',
    // backgroundColor: "#18202c"
  },
  logo: {
    padding: '1rem',
    '& span': {
      display: 'block',
      color: 'rgba(41, 113, 245, 0.87)',
    },
  },
  navCustom: {
    '& .MuiTypography-root': {
      fontSize: '.85rem',
    },
    '& .MuiListItemIcon-root': {
      minWidth: '35px',
    },
    '& .MuiCollapse-wrapperInner a': {
      paddingLeft: '50px',
    },
  },
}));

const AdminNavigation = (props) => {
  const classes = useStyles(props);

  return (
    <div>
      <div className={clsx(classes.toolbar, classes.logoBg)}>
        <Typography
          className={classes.logo}
          variant="h6"
          component="h1"
          align="center"
        >
          &copy; Wiz
          <span>Admin</span>
        </Typography>
      </div>
      <Divider />
      <List className={classes.navCustom}>
        {navigationConfig.map((item) => (
          <React.Fragment key={item.id}>
            {item.type === 'group' && <AdminNavGroup item={item} />}

            {item.type === 'collapse' && <AdminNavCollapse item={item} />}

            {item.type === 'item' && <AdminNavItem item={item} />}

            {item.type === 'link' && <AdminNavLink item={item} />}

            {item.type === 'divider' && <Divider className="my-16" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default AdminNavigation;
