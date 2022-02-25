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

const NoteList = [
  {
    id: 1,
    title: 'Find solutions',
    subTitle: 'July 20, 2020, 1:03:13 pm',
  },
  {
    id: 2,
    title: 'Read Book',
    subTitle: 'July 16, 2020, 12:57:11 am',
  },
  {
    id: 3,
    title: 'Learn Germany language',
    subTitle: 'July 20, 2020, 1:03:13 pm',
  },
];

const NotesContainer = () => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      <AdminListItems type="ListItemText" data={NoteList} />
    </List>
  );
};

export default NotesContainer;
