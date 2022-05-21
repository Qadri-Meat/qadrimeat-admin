import * as types from './types';

import StockService from '../../services/stock.service';

export const getStocks = (query) => async (dispatch) => {
  try {
    dispatch({
      type: types.STOCK_REQUEST,
    });
    const res = await StockService.getAll(query);

    dispatch({
      type: types.GET_STOCKS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.STOCK_FAIL,
      payload: message,
    });
  }
};

export const getStock = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.STOCK_REQUEST,
    });
    const res = await StockService.get(id);

    dispatch({
      type: types.GET_STOCK_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.STOCK_FAIL,
      payload: message,
    });
  }
};

export const createStock = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.STOCK_REQUEST,
    });
    const res = await StockService.create(data);

    dispatch({
      type: types.CREATE_STOCK_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.STOCK_FAIL,
      payload: message,
    });
  }
};

export const updateStock = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.STOCK_REQUEST,
    });
    const res = await StockService.update(id, data);

    dispatch({
      type: types.UPDATE_STOCK_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.STOCK_FAIL,
      payload: message,
    });
  }
};

export const deleteStock = (id) => async (dispatch) => {
  try {
    await StockService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.STOCK_FAIL,
      payload: message,
    });
  }
};
