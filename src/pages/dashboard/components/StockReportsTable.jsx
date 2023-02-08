import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    // minWidth: 650
  },
});

const StockReportsTable = ({ stocks }) => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table
        className={classes.table}
        style={{ tableLayout: "fixed" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Total Weight</TableCell>
            <TableCell align="right">Weight</TableCell>
          </TableRow>
        </TableHead>
        {stocks ? (
          <TableBody>
            {stocks.map((stock) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {stock.date}
                </TableCell>
                <TableCell align="right">{stock.totalWeight || 0}</TableCell>
                <TableCell align="right">{stock.weight || 0}</TableCell>
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

export default StockReportsTable;
