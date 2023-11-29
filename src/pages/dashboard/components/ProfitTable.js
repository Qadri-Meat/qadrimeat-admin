import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';

const rawData = [
  {
    category: 'chicken',
    stock: 10,
    sellstock: 5,
    remaningstock: 10,
    currentstock: 15,
    stockamount: 1000,
    saleamount: 750,
    profit: 250,
  },
  {
    category: 'mutton',
    stock: 15,
    sellstock: 7.5,
    remaningstock: 10.5,
    currentstock: 17.5,
    stockamount: 1500,
    saleamount: 750,
    profit: 250,
  },
  {
    category: 'beef',
    stock: 20,
    sellstock: 5,
    remaningstock: 25,
    currentstock: 30,
    stockamount: 2000,
    saleamount: 750,
    profit: 250,
  },
];
const ProfitTable = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <TableContainer style={{ padding: '10px' }}>
        <Table
          style={{ tableLayout: 'fixed' }}
          aria-label="simple table"
        >
          <TableHead>
            <Grid container>
              <Grid item>
                <Button
                  style={{ marginTop: '10px', marginRight: '80px' }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    setShowFilters(true);
                  }}
                >
                  Filters
                </Button>
              </Grid>
            </Grid>
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Category
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Stock
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Stock Sell
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Current Stock
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Remaining Stock
              </TableCell>

              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Stock Amount
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Sale Amount
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Profit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rawData.map((deal, index) => (
              <TableRow key={index}>
                <TableCell align="right">{deal.category}</TableCell>
                <TableCell align="right">{deal.stock}</TableCell>
                <TableCell align="right">{deal.sellstock}</TableCell>
                <TableCell align="right">
                  {deal.currentstock}
                </TableCell>
                <TableCell align="right">
                  {deal.remaningstock}
                </TableCell>
                <TableCell align="right">
                  {deal.stockamount}
                </TableCell>
                <TableCell align="right">{deal.saleamount}</TableCell>
                <TableCell align="right">{deal.profit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfitTable;
