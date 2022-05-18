import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    // minWidth: 650
  },
});

const BookingTable = ({ deals }) => {
  const classes = useStyles();
  console.log(deals);
  return (
    <TableContainer>
      <Table
        className={classes.table}
        style={{ tableLayout: 'fixed' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Bookings</TableCell>
          </TableRow>
        </TableHead>
        {deals ? (
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal._id}>
                <TableCell align="right">{deal.name}</TableCell>
                <TableCell align="right">{deal.bookings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <></>
        )}
      </Table>
    </TableContainer>
  );
};

export default BookingTable;
