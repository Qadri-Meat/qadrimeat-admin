import * as types from './types';

import ExpenseService from '../../services/expense.service';

export const getExpenses = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.EXPENSE_REQUEST,
    });
    const res = await ExpenseService.getAll(page, limit);

    dispatch({
      type: types.GET_EXPENSES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.EXPENSE_FAIL,
      payload: message,
    });
  }
};

export const getExpense = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.EXPENSE_REQUEST,
    });
    const res = await ExpenseService.get(id);

    dispatch({
      type: types.GET_EXPENSE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.EXPENSE_FAIL,
      payload: message,
    });
  }
};

export const createExpense = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.EXPENSE_REQUEST,
    });
    const res = await ExpenseService.create(data);

    dispatch({
      type: types.CREATE_EXPENSE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.EXPENSE_FAIL,
      payload: message,
    });
  }
};

export const updateExpense = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.EXPENSE_REQUEST,
    });
    const res = await ExpenseService.update(id, data);

    dispatch({
      type: types.UPDATE_EXPENSE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.EXPENSE_FAIL,
      payload: message,
    });
  }
};

export const deleteExpense = (id) => async (dispatch) => {
  try {
    await ExpenseService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.EXPENSE_FAIL,
      payload: message,
    });
  }
};
