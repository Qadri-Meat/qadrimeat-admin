import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { debounce } from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'; // Import SweetAlert2
import CustomFilter from 'pages/orders/components/CustomFilter';
import { Button } from '@mui/material';

const DataTable = (props) => {
  const {
    title,
    results,
    totalResults,
    columns,
    query,
    setQuery,
    onEdit,
    onDelete,
    download,
    serverSide,
    searchIcon,
    searchPlaceholder,
    showOrderTypeFilter,
    showPaymentStatusFilter,
    showDateFilter,
  } = props;

  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = debounce(async (text) => {
    setQuery({
      ...query,
      search: text == null ? '' : text,
    });
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
    page: query.page - 1,
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
            setQuery({
              ...query,
              page: tableState.page + 1,
            });
            break;
          case 'changeRowsPerPage':
            setQuery({
              ...query,
              page: 1,
              limit: tableState.rowsPerPage,
            });
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
      <MUIDataTable
        title={
          <>
            {title}{' '}
            <Button
              style={{ marginTop: '10px', marginLeft: '50px' }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </Button>
          </>
        }
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
      <CustomFilter
        showDateFilter={showDateFilter}
        showPaymentStatusFilter={showPaymentStatusFilter}
        showOrderTypeFilter={showOrderTypeFilter}
        show={showFilters}
        setShow={setShowFilters}
        query={query}
        setQuery={setQuery}
      />
    </>
  );
};

export default DataTable;
