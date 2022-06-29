import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Grid, Avatar, Typography, Box, TextField } from '@material-ui/core';

import MUIDataTable from 'mui-datatables';
import { getDiscountPrice } from 'helpers/product';
import {
  addToCart1,
  decreaseQuantity,
  deleteFromCart1,
  increaseQuantity,
  updateCart1Item,
} from 'state/ducks/cart1/actions';
import { Autocomplete } from '@material-ui/lab';

const BookingItems = ({ preloadedValues }) => {
  const dispatch = useDispatch();

  let cart1TotalPrice = 0;
  const [searchBar, setSearchBar] = useState(1);

  const items = useSelector((state) => state.cart1);
  const { results } = useSelector((state) => state.deal);

  const columns = [
    {
      name: 'id',
      label: 'id',
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: 'image',
      label: 'Image',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const image = value.length > 0 ? value[0] : '';
          return (
            <Avatar
              variant="rounded"
              src={image === '' ? '' : process.env.REACT_APP_API_URL + image}
            />
          );
        },
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
        setCellProps: () => ({
          style: { minWidth: '100px', maxWidth: '100px' },
        }),
      },
    },
    {
      name: 'price',
      label: 'Price',
      options: {
        filter: true,
        sort: false,

        setCellProps: () => ({
          style: { minWidth: '100px', maxWidth: '100px' },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData, rowIndex } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          const discountedPrice = getDiscountPrice(
            cart1Item.price,
            cart1Item.discount
          );
          const finalProductPrice = cart1Item.price * 1;
          const finalDiscountedPrice = discountedPrice * 1;
          cart1TotalPrice = rowIndex === 0 ? 0 : cart1TotalPrice;
          discountedPrice != null
            ? (cart1TotalPrice += finalDiscountedPrice * cart1Item.quantity)
            : (cart1TotalPrice += finalProductPrice * cart1Item.quantity);

          return (
            <>
              {discountedPrice !== null ? (
                <>
                  <span
                    style={{ textDecoration: 'line-through', color: 'gray' }}
                  >
                    {'PKR ' + finalProductPrice}
                  </span>
                  <br />
                  <span className="amount">
                    {'    PKR ' + finalDiscountedPrice}
                  </span>
                </>
              ) : (
                <span>{'PKR ' + finalProductPrice}</span>
              )}
            </>
          );
        },
      },
    },
    {
      name: 'day',
      label: 'Day',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <select
              name="day"
              id="day"
              value={value}
              hidden={!cart1Item.isPackage}
              onChange={(e) => {
                dispatch(
                  updateCart1Item({
                    ...cart1Item,
                    day: e.target.value,
                  })
                );
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          );
        },
      },
    },
    {
      name: 'time',
      label: 'Time',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <input
              type="time"
              id="appt"
              name="appt"
              value={value}
              hidden={!cart1Item.isPackage}
              onChange={(e) => {
                dispatch(
                  updateCart1Item({
                    ...cart1Item,
                    time: e.target.value,
                  })
                );
              }}
            />
          );
        },
      },
    },
    {
      name: 'isPackage',
      label: 'Package',
      options: {
        filter: false,
        setCellProps: () => ({
          style: { minWidth: '50px', maxWidth: '50px' },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <select
              name="isPackage"
              id="isPackage"
              value={value}
              style={{ minWidth: '80px', maxWidth: '80px' }}
              onChange={(e) => {
                dispatch(
                  updateCart1Item({
                    ...cart1Item,
                    isPackage: e.target.value,
                  })
                );
              }}
            >
              <option value="true">Package</option>
              <option value="false">Non Package</option>
            </select>
          );
        },
      },
    },
    {
      name: 'quantity',
      label: 'Quantity',
      options: {
        filter: false,
        sort: false,
        setCellProps: () => ({
          style: { minWidth: '100px', maxWidth: '100px' },
        }),
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          return (
            <>
              <IconButton
                onClick={() => {
                  dispatch(increaseQuantity(cart1Item));
                }}
              >
                <AddIcon />
              </IconButton>
              {value}
              <IconButton
                onClick={() => {
                  if (cart1Item.quantity === 1) {
                    dispatch(deleteFromCart1(cart1Item));
                  } else {
                    dispatch(decreaseQuantity(cart1Item));
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
            </>
          );
        },
      },
    },
    {
      name: 'price',
      label: 'Sub Total',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const { rowData } = tableMeta;
          const cart1Item = items.filter((item) => {
            return item.id === rowData[0];
          })[0];
          const discountedPrice = getDiscountPrice(
            cart1Item.price,
            cart1Item.discount
          );
          const finalProductPrice = cart1Item.price * 1;
          const finalDiscountedPrice = discountedPrice * 1;
          return (
            <>
              {discountedPrice !== null
                ? 'PKR ' + finalDiscountedPrice * cart1Item.quantity
                : 'PKR ' + finalProductPrice * cart1Item.quantity}
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    count: 100,
    onRowsDelete: (rowsDeleted, dataRows) => {
      rowsDeleted.data.forEach(({ index }) => {
        dispatch(deleteFromCart1(items[index]));
      });
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            m: 3,
          }}
        >
          <Box>
            <Typography variant="h6">Grand Total</Typography>
            <Typography variant="body1">
              PKR
              {' ' + cart1TotalPrice}
            </Typography>
          </Box>
        </Box>
      );
    },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Autocomplete
          key={searchBar}
          disablePortal
          id="combo-box-demo"
          options={results}
          getOptionLabel={(option) => option.name}
          onChange={(event, values) => {
            if (values) {
              const item = {
                id: uuidv4(),
                name: values.name,
                quantity: values.quantity,
                price: values.price,
                discount: 0,
                image: values.image,
                deal: values.id,
                day: 1,
                time: '10 am',
                isPackage: true,
              };
              dispatch(addToCart1(item));
              setSearchBar(Math.random());
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search Deals" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <MUIDataTable
          title={'Booking Items'}
          data={items}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

export default BookingItems;
