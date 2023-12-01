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
