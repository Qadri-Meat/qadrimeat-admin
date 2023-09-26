import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const DailyReportTable = ({ deals }) => {
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
              Sale
            </TableCell>

            <TableCell
              align="right"
              style={{ fontWeight: "bold", color: "#555555" }}
            >
              Remaining
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="right">w</TableCell>
            <TableCell align="right">---</TableCell>
            <TableCell align="right">---</TableCell>
            <TableCell align="right">---</TableCell>{" "}
          </TableRow>
          <TableRow>
            <TableCell align="right">w</TableCell>
            <TableCell align="right">---</TableCell>
            <TableCell align="right">---</TableCell>
            <TableCell align="right">---</TableCell>{" "}
          </TableRow>
          <TableRow>
            <TableCell align="right">w</TableCell>
            <TableCell align="right">---</TableCell>
            <TableCell align="right">---</TableCell>
            <TableCell align="right">---</TableCell>{" "}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DailyReportTable;
