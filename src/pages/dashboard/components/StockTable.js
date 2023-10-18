import Loader from '@core/components/ui/Loader';
import { buildURLQuery } from '@core/utils/buildURLQuery';
import {
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
          {/* <TableHead>
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Date
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Mutton
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Chicken
              </TableCell>

              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Beef
              </TableCell>
            </TableRow>
          </TableHead> */}

          <TableHead>
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Date
              </TableCell>

              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Price || Stock Weight || Sale || Remaning Stock
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Price || Stock Weight || Sale || Remaning Stock
              </TableCell>

              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Price || Stock Weight || Sale || Remaning Stock
              </TableCell>
            </TableRow>
          </TableHead>
          {sortedStockReport ? (
            <TableBody>
              {sortedStockReport.map((result) => (
                <TableRow key={result._id}>
                  <TableCell align="right">{result._id}</TableCell>
                  {result.reports.map((re1, index) => {
                    if (re1.category === 'mutton') {
                      return (
                        <TableCell key={index} align="right">
                          <b>
                            {re1.category.charAt(0).toUpperCase() +
                              re1.category.slice(1)}{' '}
                            ={' '}
                          </b>
                          {re1.stockPurchasedAmount} ||{' '}
                          {re1.totalWeight} || {re1.totalSale} ||{' '}
                          {re1.stockAvailableInWeight}
                        </TableCell>
                      );
                    } else if (re1.category === 'chicken') {
                      return (
                        <TableCell key={index} align="right">
                          <b>
                            {re1.category.charAt(0).toUpperCase() +
                              re1.category.slice(1)}{' '}
                            ={' '}
                          </b>
                          {re1.stockPurchasedAmount} ||{' '}
                          {re1.totalWeight} || {re1.totalSale} ||{' '}
                          {re1.stockAvailableInWeight}
                        </TableCell>
                      );
                    } else if (re1.category === 'beef') {
                      return (
                        <TableCell key={index} align="right">
                          <b>
                            {re1.category.charAt(0).toUpperCase() +
                              re1.category.slice(1)}{' '}
                            ={' '}
                          </b>
                          {re1.stockPurchasedAmount} ||{' '}
                          {re1.totalWeight} || {re1.totalSale} ||{' '}
                          {re1.stockAvailableInWeight}
                        </TableCell>
                      );
                    }
                  })}
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
