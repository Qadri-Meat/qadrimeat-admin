import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const BookingTable = ({ deals }) => {
  return (
    <TableContainer style={{ padding: "10px" }}>
      <Table style={{ tableLayout: "fixed" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="right"
              style={{ fontWeight: "bold", color: "#555555" }}
            >
              Name
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bold", color: "#555555" }}
            >
              Stock
            </TableCell>
            <TableCell
              align="right"
              style={{ fontWeight: "bold", color: "#555555" }}
            >
              Package
            </TableCell>

            <TableCell
              align="right"
              style={{ fontWeight: "bold", color: "#555555" }}
            >
              Non-Package
            </TableCell>

            <TableCell
              align="right"
              style={{ fontWeight: "bold", color: "#555555" }}
            >
              Remaining
            </TableCell>
          </TableRow>
        </TableHead>
        {deals ? (
          <TableBody>
            {deals.map((deal) => (
              <TableRow key={deal._id}>
                <TableCell align="right">{deal.name}</TableCell>
                <TableCell align="right">{deal.stock}</TableCell>
                <TableCell align="right">{deal.package}</TableCell>
                <TableCell align="right">{deal.nonPackage}</TableCell>
                <TableCell align="right">
                  {deal.stock - (deal.package + deal.nonPackage)}
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

export default BookingTable;
