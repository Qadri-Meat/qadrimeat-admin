import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
  ListItemIcon,
  Hidden,
} from '@material-ui/core';

import AdminAvatarBadge from '../AdminAvatarBadge/AdminAvatarBadge';
import { AccountCircle, Settings, ExitToApp } from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'state/ducks/auth/actions';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  menuIcon: {
    minWidth: '33px',
  },
  paddingRightZero: {
    paddingRight: 0,
  },
}));

const AdminAvatarMenu = (props) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <ListItem
        button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        alignItems="flex-start"
        className={classes.paddingRightZero}
      >
        <ListItemAvatar>
          <AdminAvatarBadge
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar alt="Mohammad Admin" src="" />
          </AdminAvatarBadge>
        </ListItemAvatar>
        <Hidden implementation="css" smDown>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography component="span" variant="subtitle2">
                  {user && user.name}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="caption"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {user && user.role}
                </Typography>
              </React.Fragment>
            }
          />
        </Hidden>
      </ListItem>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon className={classes.menuIcon}>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon className={classes.menuIcon}>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    settings
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon className={classes.menuIcon}>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

AdminAvatarMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
};

export default AdminAvatarMenu;
