import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { numberWithCommas } from "helper/numers";
import React from "react";
const BookingReportsTable = ({ reports }) => {
  return (
    <TableContainer style={{ padding: "10px" }}>
      <Table style={{ tableLayout: "fixed" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold", color: "#555555" }}>
              Month/Year
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", color: "#555555" }}
              align="right"
            >
              Bookings
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", color: "#555555" }}
              align="right"
            >
              Expenses
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", color: "#555555" }}
              align="right"
            >
              Sales
            </TableCell>
          </TableRow>
        </TableHead>
        {reports ? (
          <TableBody>
            {reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {report.month + "/" + report.year}
                </TableCell>
                <TableCell align="right">{report.totalBookings || 0}</TableCell>
                <TableCell align="right">{report.totalExpenses || 0}</TableCell>
                <TableCell align="right">
                  {numberWithCommas(report.totalBookingSales || 0)}
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

export default BookingReportsTable;
