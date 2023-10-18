import Loader from '@core/components/ui/Loader';
import { buildURLQuery } from '@core/utils/buildURLQuery';
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
import { isNullOrEmpty } from 'helper/helpers';
import DateRangePicker from 'pages/stocks/components/DateRangePicker';
import React, { useEffect, useState } from 'react';

const StockTable = ({ stockReport, loading, setQuery }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleResetFilter = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!isNullOrEmpty(startDate) && !isNullOrEmpty(endDate))
      setQuery(
        buildURLQuery({
          startDate,
          endDate,
        })
      );
  }, [setQuery, startDate, endDate]);

  // Sort the stockReport array by date in descending order
  const sortedStockReport = stockReport.slice().sort((a, b) => {
    return new Date(b._id) - new Date(a._id);
  });

  return (
    <TableContainer style={{ padding: '10px' }}>
      {loading ? (
        <Loader />
      ) : (
        <Table
          style={{ tableLayout: 'fixed' }}
          aria-label="simple table"
        >
          <TableHead>
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <Grid item>
              <Button
                onClick={handleResetFilter}
                variant="outlined"
                color="primary"
                size="small"
                style={{ marginTop: '15px', marginLeft: '30px' }}
              >
                Clear Filter
              </Button>
            </Grid>
            <TableRow>
              <TableCell
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Date
              </TableCell>

              <TableCell
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>Stock</TableCell>
                      <TableCell>Total Weight Sold</TableCell>
                      <TableCell>Remaning Stock</TableCell>
                      <TableCell>Stock Amount</TableCell>
                      <TableCell>Profit</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableCell>
            </TableRow>
          </TableHead>
          {sortedStockReport ? (
            <TableBody>
              {sortedStockReport.map((result) => (
                <TableRow key={result._id} style={{ width: '100px' }}>
                  <TableCell>{result._id}</TableCell>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {result.reports.map((r) => (
                          <TableRow>
                            <TableCell>{r.category}</TableCell>
                            <TableCell>{r.totalWeight}</TableCell>
                            <TableCell>{r.totalSale}</TableCell>
                            <TableCell>
                              {r.stockAvailableInWeight}
                            </TableCell>
                            <TableCell>
                              {r.stockPurchasedAmount}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <></>
          )}
        </Table>
      )}
    </TableContainer>
  );
};

export default StockTable;
