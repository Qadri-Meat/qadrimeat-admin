import * as types from './types';

import CategoryService from '../../services/categories.service';

export const getCategories = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.CATEGORY_REQUEST,
    });
    const res = await CategoryService.getAll(page, limit);

    dispatch({
      type: types.GET_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.CATEGORY_FAIL,
      payload: message,
    });
  }
};

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.CATEGORY_REQUEST,
    });
    const res = await CategoryService.get(id);

    dispatch({
      type: types.GET_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.CATEGORY_FAIL,
      payload: message,
    });
  }
};

export const createCategory = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.CATEGORY_REQUEST,
    });
    const res = await CategoryService.create(data);

    dispatch({
      type: types.CREATE_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.CATEGORY_FAIL,
      payload: message,
    });
  }
};

export const updateCategory = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.CATEGORY_REQUEST,
    });
    const res = await CategoryService.update(id, data);

    dispatch({
      type: types.UPDATE_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.CATEGORY_FAIL,
      payload: message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await CategoryService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.CATEGORY_FAIL,
      payload: message,
    });
  }
};
