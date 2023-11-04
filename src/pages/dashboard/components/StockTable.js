import Loader from '@core/components/ui/Loader';
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
import CustomFilter from 'pages/orders/components/CustomFilter';
import React, { useState } from 'react';

const StockTable = ({ stockReport, loading, setQuery }) => {
  const [showEditDetails, setShowEditDetails] = useState(false);

  const handleResetFilter = () => {
    window.location.reload();
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
    <>
      <TableContainer style={{ padding: '10px' }}>
        {loading ? (
          <Loader />
        ) : (
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
                      setShowEditDetails(true);
                    }}
                  >
                    Filters
                  </Button>
                </Grid>
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
              </Grid>
            </TableHead>

            {stockReport ? (
              <TableBody>
                {stockReport.map((result) => (
                  <>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: 'bold',
                          color: '#555555',
                        }}
                      >
                        Date
                      </TableCell>

                      <TableCell
                        style={{
                          fontWeight: 'bold',
                          color: '#555555',
                        }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Category</TableCell>
                              <TableCell>Stock</TableCell>
                              <TableCell>Total Weight Sold</TableCell>
                              <TableCell>Remaning Stock</TableCell>
                              <TableCell>Stock Amount</TableCell>
                            </TableRow>
                          </TableHead>
                        </Table>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      key={result._id}
                      style={{ width: '100px' }}
                    >
                      <TableCell>
                        {convertUTCDateToLocalDate(
                          new Date(result.date)
                        )}
                      </TableCell>

                      <TableCell>
                        <Table>
                          <TableBody>
                            {result?.data.map((r) => (
                              <TableRow>
                                <TableCell>
                                  {r.category
                                    ? r.category
                                    : '----------'}
                                </TableCell>
                                <TableCell>
                                  {r.stockWeight
                                    ? r.stockWeight
                                    : '----------'}
                                </TableCell>
                                <TableCell>
                                  {r.saleWeight
                                    ? r.saleWeight
                                    : '----------'}
                                </TableCell>
                                <TableCell>
                                  {r.stockWeight && r.saleWeight
                                    ? r.stockWeight - r.saleWeight
                                    : '----------'}
                                </TableCell>
                                <TableCell>
                                  {r.stockPrice && r.stockWeight
                                    ? r.stockPrice * r.stockWeight
                                    : '----------'}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            ) : (
              <></>
            )}
          </Table>
        )}
      </TableContainer>
      <CustomFilter
        handleResetFilter={handleResetFilter}
        show={showEditDetails}
        setShow={setShowEditDetails}
        setQuery={setQuery}
      />
    </>
  );
};

export default StockTable;
