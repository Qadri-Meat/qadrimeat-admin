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
                              Opening Stock (KG)
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Purchase Stock (KG)
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Stock Cost (Rs)
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Total Stock (KG)
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Total Stock Cost (Rs)
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Stock Sold (KG)
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Sale Price (Rs)
                            </TableCell>

                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Remaning Stock (KG)
                            </TableCell>

                            <TableCell
                              style={{
                                borderBottom: 'none',
                                width: '130px',
                              }}
                            >
                              Profit (Rs)
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
                                      width: '235px',
                                    }}
                                  >
                                    {r.category ?? '-'}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '215px',
                                    }}
                                  >
                                    {' '}
                                    {r.rStock ?? 0}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '225px',
                                    }}
                                  >
                                    {' '}
                                    {(r.stockWeight ?? 0) -
                                      (r.rStock ?? 0)}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '225px',
                                    }}
                                  >
                                    {r.purchasePrice ?? 0}-
                                    {r.remainingStockAmount ?? 0}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {(r.stockWeight ?? 0) -
                                      (r.rStock ?? 0) +
                                      (r.rStock ?? r.rStock: 0)}
                                  </TableCell>

                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {' '}
                                    {r.purchasePrice ?? 0}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {r.saleWeight ?? 0}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {r.salePrice ?? 0}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {' '}
                                    {(r.stockWeight ?? 0) -
                                      (r.rStock ?? 0) +
                                      (r.rStock !== undefined
                                        ? r.rStock
                                        : 0) -
                                      r.saleWeight ?? 0}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      width: '168px',
                                    }}
                                  >
                                    {Math.round(
                                      r.salePrice
                                        ? r.salePrice -
                                            ((r.purchasePrice ?? 0) /
                                              (r.stockWeight !==
                                              undefined
                                                ? r.stockWeight
                                                : 0) +
                                              (r.rStock !== undefined
                                                ? r.rStock
                                                : 0)) *
                                              (r.saleWeight ?? 1)
                                        : 0
                                    )}
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
