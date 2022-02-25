import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AdminListItemIcon from './sections/AdminListItemIcon';
import AdminListItemAvatar from './sections/AdminListItemAvatar';

const AdminListItems = (props) => {
  const { data, type, divider, button } = props;

  return (
    <>
      {data.map((item) => (
        <ListItem divider={divider} button={button} key={item.id}>
          <React.Fragment>
            {type === 'ListItemIcon' && <AdminListItemIcon item={item} />}

            {type === 'ListItemAvatar' && <AdminListItemAvatar item={item} />}

            {type === 'ListItemText' && (
              <ListItemText
                primary={item.title}
                secondary={item.subTitle ? item.subTitle : ''}
              />
            )}
          </React.Fragment>
        </ListItem>
      ))}
    </>
  );
};

export default AdminListItems;
