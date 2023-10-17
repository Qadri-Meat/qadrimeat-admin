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
            <TableRow>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Name
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
                Stock Amount
              </TableCell>

              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Sale Stock
              </TableCell>

              <TableCell
                align="right"
                style={{ fontWeight: 'bold', color: '#555555' }}
              >
                Remaning Stock
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
                Profits
              </TableCell>
            </TableRow>
          </TableHead>
          {stockReport ? (
            <TableBody>
              {stockReport.map((result) => (
                <TableRow key={result._id}>
                  <TableCell align="right">
                    {result.category}
                  </TableCell>
                  <TableCell align="right">{result.stock}</TableCell>
                  <TableCell align="right">
                    {result.package}
                  </TableCell>
                  <TableCell align="right">
                    {result.nonPackage}
                  </TableCell>
                  <TableCell align="right">
                    {result.stock -
                      (result.package + result.nonPackage)}
                  </TableCell>
                  <TableCell align="right">
                    {result.stock -
                      (result.package + result.nonPackage)}
                  </TableCell>
                  <TableCell align="right">
                    {result.stock -
                      (result.package + result.nonPackage)}
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
