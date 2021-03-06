import * as types from './types';

import OrderService from '../../services/order.service';
import { DELETE_ALL_FROM_CART } from '../cart/types';

export const getOrders = (query) => async (dispatch) => {
  try {
    dispatch({
      type: types.ORDER_REQUEST,
    });
    const res = await OrderService.getAll(query);

    dispatch({
      type: types.GET_ORDERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.ORDER_FAIL,
      payload: message,
    });
  }
};

export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.ORDER_REQUEST,
    });
    const res = await OrderService.get(id);

    dispatch({
      type: types.GET_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.ORDER_FAIL,
      payload: message,
    });
  }
};

export const updateOrder = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.ORDER_REQUEST,
    });
    const res = await OrderService.update(id, data);

    dispatch({
      type: types.UPDATE_ORDER_SUCCESS,
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
      type: types.ORDER_FAIL,
      payload: message,
    });
  }
};

export const createOrder = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.ORDER_REQUEST,
    });
    const res = await OrderService.create(data);

    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
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
      type: types.ORDER_FAIL,
      payload: message,
    });
  }
};

export const addTransaction = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.ORDER_REQUEST,
    });
    const res = await OrderService.addTransaction(id, data);

    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.ORDER_FAIL,
      payload: message,
    });
  }
};
