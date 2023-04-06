import * as types from "./types";

import DealService from "../../services/deal.service";

export const getUsers = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.DEAL_REQUEST,
    });
    const res = await DealService.getAll(page, limit);

    dispatch({
      type: types.GET_DEAL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.Deal_FAIL,
      payload: message,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.DEAL_REQUEST,
    });
    const res = await DealService.get(id);

    dispatch({
      type: types.GET_DEAL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.DEAL_FAIL,
      payload: message,
    });
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.DEAL_REQUEST,
    });
    const res = await DealService.create(data);

    dispatch({
      type: types.CREATE_DEAL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.DEAL_FAIL,
      payload: message,
    });
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.DEAL_REQUEST,
    });
    const res = await DealService.update(id, data);

    dispatch({
      type: types.UPDATE_DEAL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.DEAL_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await DealService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.DEAL_FAIL,
      payload: message,
    });
  }
};
