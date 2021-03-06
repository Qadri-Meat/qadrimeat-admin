import * as types from './types';

import DealService from '../../services/deal.service';

export const getDeals = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.DEAL_REQUEST,
    });
    const res = await DealService.getAll(page, limit);

    dispatch({
      type: types.GET_DEALS_SUCCESS,
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

export const getDeal = (id) => async (dispatch) => {
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

export const createDeal = (data) => async (dispatch) => {
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

export const updateDeal = (id, data) => async (dispatch) => {
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

export const deleteDeal = (id) => async (dispatch) => {
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
