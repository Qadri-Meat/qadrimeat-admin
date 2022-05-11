import * as types from './types';

import BookingService from '../../services/booking.service';
import { DELETE_ALL_FROM_CART } from '../cart/types';

export const getBookings = (page, limit, type) => async (dispatch) => {
  try {
    dispatch({
      type: types.BOOKING_REQUEST,
    });
    const res = await BookingService.getAll(page, limit, type);

    dispatch({
      type: types.GET_BOOKINGS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BOOKING_FAIL,
      payload: message,
    });
  }
};

export const getBookingItems = (day, deal) => async (dispatch) => {
  try {
    dispatch({
      type: types.BOOKING_REQUEST,
    });
    const res = await BookingService.getBookingItems(day, deal);

    dispatch({
      type: types.GET_BOOKING_ITEMS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BOOKING_FAIL,
      payload: message,
    });
  }
};

export const getBooking = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.BOOKING_REQUEST,
    });
    const res = await BookingService.get(id);

    dispatch({
      type: types.GET_BOOKING_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BOOKING_FAIL,
      payload: message,
    });
  }
};

export const updateBooking = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.BOOKING_REQUEST,
    });
    const res = await BookingService.update(id, data);

    dispatch({
      type: types.UPDATE_BOOKING_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: DELETE_ALL_FROM_CART,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BOOKING_FAIL,
      payload: message,
    });
  }
};

export const createBooking = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.BOOKING_REQUEST,
    });

    const res = await BookingService.create(data);

    dispatch({
      type: types.CREATE_BOOKING_SUCCESS,
      payload: res.data,
    });
    dispatch({
      type: DELETE_ALL_FROM_CART,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BOOKING_FAIL,
      payload: message,
    });
  }
};

export const addTransaction = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.BOOKING_REQUEST,
    });
    const res = await BookingService.addTransaction(id, data);

    dispatch({
      type: types.CREATE_BOOKING_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.BOOKING_FAIL,
      payload: message,
    });
  }
};
