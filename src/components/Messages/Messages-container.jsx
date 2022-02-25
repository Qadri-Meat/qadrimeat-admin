import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import AdminListItems from '../AdminListItems/AdminListItems';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const MsgList = [
  {
    id: 1,
    title: 'Remy Sharp',
    avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
    subTitle: "Ali Connors — I'll be in your neighborhood...",
  },
  {
    id: 2,
    title: 'Mohammad Admin',
    avatar: '',
    subTitle: "Hi I'm Mohammad Admin",
  },
  {
    id: 3,
    title: 'Jennifer.ms',
    avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
    subTitle: 'Do you have Paris recommendations?',
  },
];

const MessagesContainer = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <AdminListItems type="ListItemAvatar" data={MsgList} />
    </List>
  );
};

export default MessagesContainer;
