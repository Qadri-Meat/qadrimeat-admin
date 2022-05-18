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

const ReportsTable = ({ reports }) => {
  const classes = useStyles();
  console.log(reports);
  return (
    <TableContainer>
      <Table
        className={classes.table}
        style={{ tableLayout: 'fixed' }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Month/Year</TableCell>
            <TableCell align="right">Orders</TableCell>
            <TableCell align="right">Bookings</TableCell>
            <TableCell align="right">Sales</TableCell>
            <TableCell align="right">Expenses</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>
        {reports ? (
          <TableBody>
            {reports.map((report) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {report.month + '/' + report.year}
                </TableCell>
                <TableCell align="right">{report.totalOrders || 0}</TableCell>
                <TableCell align="right">{report.totalBookings || 0}</TableCell>
                <TableCell align="right">{report.totalSales || 0}</TableCell>
                <TableCell align="right">{report.totalExpenses || 0}</TableCell>
                <TableCell align="right">
                  {(report.totalSales || 0) - (report.totalExpenses || 0)}
                </TableCell>
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

export default ReportsTable;
