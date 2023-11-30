import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CustomFilter from 'pages/orders/components/CustomFilter';
import React, { useState } from 'react';

const StockTable = ({
  stockReport,
  loading,
  query,
  setQuery,
  showPaymentStatusFilter,
  showOrderTypeFilter,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const uniqueKey = uuidv4();
  let tempChicken = 0;
  let tempMutton = 0;
  let tempBeef = 0;
  // function calculateRemainingAndAddToNextDay(stockReport) {
  //   for (let i = 0; i < stockReport.length - 1; i++) {
  //     const currentDay = stockReport[i];
  //     const nextDay = stockReport[i + 1];

  //     // Check if currentDay.data is defined before using forEach
  //     if (currentDay && currentDay.data) {
  //       stockReport[i].data = currentDay.data.map((item, index) => {
  //         const remainingWeight = item.stockWeight - item.saleWeight;
  //         if (nextDay) {
  //           const nextDayItemIndex = nextDay.data.findIndex(
  //             (nextItem) => nextItem.category === item.category
  //           );
  //           if (nextDayItemIndex !== -1) {
  //             // Create a new object with updated stockWeight
  //             return {
  //               ...nextDay.data[nextDayItemIndex],
  //               stockWeight:
  //                 nextDay.data[nextDayItemIndex].stockWeight +
  //                 remainingWeight,
  //             };
  //           }
  //         }
  //         return item;
  //       });
  //     }
  //   }
  //   return stockReport;
  // }

  // const updatedData =
  //   calculateRemainingAndAddToNextDay(savedStockReport);
  // console.log('ok', JSON.stringify(updatedData, null, 2));

  const handleResetFilter = () => {
    setQuery({});
  };

  function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate.toLocaleString();
  }

  return (
    <Paper style={{ padding: 10, marginTop: 15 }} variant="outlined">
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          variant="h6"
          id="tableTitle"
          component="div"
          sx={{ marginRight: 2 }}
        >
          Daily Reports
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setShowFilters(true);
          }}
        >
          Filters
        </Button>
      </Toolbar>
      <TableContainer style={{ padding: '10px' }}>
        <Table
          style={{ tableLayout: 'fixed' }}
          aria-label="simple table"
        >
          <TableBody>
            {stockReport?.map((result, index) => (
              <React.Fragment key={index}>
                <>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: 'bold',
                        width: '200px',
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: 'bold',
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Category
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Stock
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Total Stock
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Total Weight Sold
                            </TableCell>

                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Remaning Stock
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Stock Amount
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Sale Amount
                            </TableCell>

                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Profit
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell width="200px">
                      {convertUTCDateToLocalDate(
                        new Date(result.date)
                      )}
                    </TableCell>

                    <TableCell>
                      <Table>
                        <TableBody>
                          {result?.data.map((r, i) => {
                            const prev =
                              index > 0
                                ? stockReport[index - 1].data.filter(
                                    (d) => d.category === r.category
                                  )[0]
                                : null;

                            const totalStock = prev
                              ? r.stockWeight +
                                tempChicken +
                                ((prev.stockWeight ?? 0) -
                                  (prev.saleWeight ?? 0))
                              : r.stockWeight;
                            const remainingStock =
                              totalStock - (r.saleWeight ?? 0);
                            return (
                              <>
                                <TableRow key={`${result.id}-${i}`}>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {r.category ?? '-'}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {' '}
                                    {r.originalStock ?? 0}
                                  </TableCell>
                                  <TableCell>
                                    {r.stockWeight ?? '-'}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {r.saleWeight ?? '-'}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {(r.stockWeight ?? 0) -
                                      (r.saleWeight ?? 0)}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {r.stockPrice && r.stockWeight
                                      ? r.stockPrice * r.stockWeight
                                      : '-'}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {r.salePrice ?? '-'}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {r.saleWeight && r.stockPrice
                                      ? r.salePrice -
                                        r.saleWeight * r.stockPrice
                                      : '-'}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomFilter
        showPaymentStatusFilter={showPaymentStatusFilter}
        showOrderTypeFilter={showOrderTypeFilter}
        handleResetFilter={handleResetFilter}
        show={showFilters}
        setShow={setShowFilters}
        query={query}
        setQuery={setQuery}
      />
    </Paper>
  );
};

export default StockTable;
