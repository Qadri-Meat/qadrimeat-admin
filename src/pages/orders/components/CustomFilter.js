import React from 'react';
import DateRangePicker from 'pages/stocks/components/DateRangePicker';
import CustomToggle from '@core/components/forms/CustomToggle';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';

const CustomFilter = ({ show, setShow, query, setQuery }) => {
  const handleClose = () => {
    setShow(false);
  };

  const handleResetFilter = () => {
    setQuery({ page: 1, limit: 10 });
    setShow(false);
  };

  return (
    <Dialog open={show} onClose={handleClose} fullWidth>
      <DialogTitle>Filters</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body">Date Range</Typography>
            <DateRangePicker
              startDate={query.startDate}
              setStartDate={(startDate) =>
                setQuery({ ...query, startDate })
              }
              endDate={query.endDate}
              setEndDate={(endDate) =>
                setQuery({ ...query, endDate })
              }
            />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item>
              <CustomToggle
                label="Type"
                value={query.type}
                onChange={(value) =>
                  setQuery({ ...query, type: value })
                }
                options={['online', 'retail']}
              />
            </Grid>
            <Grid item>
              <CustomToggle
                label="Payment Status"
                value={query.isPaid}
                onChange={(value) =>
                  setQuery({ ...query, isPaid: value })
                }
                options={['true', 'false']}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ marginRight: '10px', marginTop: '10px' }}
          onClick={handleResetFilter}
          variant="outlined"
          color="primary"
          size="small"
        >
          Clear Filter
        </Button>
        <Button
          style={{ marginRight: '10px', marginTop: '10px' }}
          onClick={handleClose}
          variant="outlined"
          color="primary"
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomFilter;
