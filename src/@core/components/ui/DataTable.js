import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { debounce } from 'lodash';
import { buildURLQuery } from '@core/utils/buildURLQuery';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Loader from './Loader';
import DateRangePicker from 'pages/stocks/components/DateRangePicker';
import { isNullOrEmpty } from 'helper/helpers';

const DataTable = (props) => {
  const {
    title,
    results,
    totalResults,
    columns,
    setQuery,
    onEdit,
    onDelete,
    download,
    serverSide,
    searchIcon,
    searchPlaceholder,
    loading,
  } = props;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  // Initialize start and end dates with default values
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

  const debouncedSearch = debounce(async (text) => {
    setSearch(text == null ? '' : text);
    setQuery(
      buildURLQuery({
        page,
        limit,
        search: text == null ? '' : text,
        startDate,
        endDate,
      })
    );
  }, 1000);

  const handleDelete = (value) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(value);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  };

  const options = {
    count: totalResults,
    page: page - 1,
    serverSide: serverSide ?? true,
    filter: false,
    columns: false,
    print: false,
    viewColumns: false,
    download: download,
    selectableRows: 'none',
    sort: false,
    responsive: 'simple',
    search: searchIcon,
    searchPlaceholder,
    onTableChange: (action, tableState) => {
      if (serverSide !== false) {
        switch (action) {
          case 'changePage':
            setPage(tableState.page + 1);
            setQuery(
              buildURLQuery({
                page: tableState.page + 1,
                limit,
                search,
                startDate,
                endDate,
              })
            );
            break;
          case 'changeRowsPerPage':
            setLimit(tableState.rowsPerPage);
            setPage(1);
            setQuery(
              buildURLQuery({
                page: 1,
                limit: tableState.rowsPerPage,
                search,
                startDate,
                endDate,
              })
            );
            break;
          case 'search':
            debouncedSearch(tableState.searchText);
            break;
          default:
            break;
        }
      }
    },
  };

  return (
    <>
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {loading ? (
        <Loader />
      ) : (
        <MUIDataTable
          title={title}
          data={results}
          columns={
            onEdit || onDelete
              ? columns.concat({
                  name: 'id',
                  label: 'Actions',
                  options: {
                    download: false,
                    customBodyRender: (
                      value,
                      tableMeta,
                      updateValue
                    ) => {
                      return (
                        <div style={{ minWidth: '50px' }}>
                          {onEdit && (
                            <span
                              onClick={() => {
                                onEdit(value);
                              }}
                            >
                              <EditIcon />
                            </span>
                          )}
                          {onDelete && (
                            <span
                              onClick={() => {
                                handleDelete(value);
                              }}
                            >
                              <DeleteIcon style={{ color: 'red' }} />
                            </span>
                          )}
                        </div>
                      );
                    },
                  },
                })
              : columns
          }
          options={options}
        />
      )}
    </>
  );
};

export default DataTable;
