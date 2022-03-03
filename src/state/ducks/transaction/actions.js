import * as types from './types';

import TransactionService from '../../services/transaction.service';

export const getTransactions = (order) => async (dispatch) => {
  try {
    dispatch({
      type: types.TRANSACTION_REQUEST,
    });
    const res = await TransactionService.getAll(order);

    dispatch({
      type: types.GET_TRANSACTIONS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TRANSACTION_FAIL,
      payload: message,
    });
  }
};

export const getTransaction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.TRANSACTION_REQUEST,
    });
    const res = await TransactionService.get(id);

    dispatch({
      type: types.GET_TRANSACTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TRANSACTION_FAIL,
      payload: message,
    });
  }
};

export const createTransaction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.TRANSACTION_REQUEST,
    });
    console.log(data);
    const res = await TransactionService.create(data);

    dispatch({
      type: types.CREATE_TRANSACTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TRANSACTION_FAIL,
      payload: message,
    });
  }
};
export const updateTransaction = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.TRANSACTION_REQUEST,
    });
    const res = await TransactionService.update(id, data);

    dispatch({
      type: types.UPDATE_TRANSACTION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.TRANSACTION_FAIL,
      payload: message,
    });
  }
};
