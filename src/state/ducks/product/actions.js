import * as types from './types';

import ProductService from '../../services/product.service';

export const getProducts = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.PRODUCT_REQUEST,
    });
    const res = await ProductService.getAll(page, limit);

    dispatch({
      type: types.GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PRODUCT_REQUEST,
    });
    const res = await ProductService.get(id);

    dispatch({
      type: types.GET_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PRODUCT_REQUEST,
    });
    const res = await ProductService.create(data);

    dispatch({
      type: types.CREATE_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PRODUCT_REQUEST,
    });
    const res = await ProductService.update(id, data);

    dispatch({
      type: types.UPDATE_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PRODUCT_FAIL,
      payload: message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await ProductService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PRODUCT_FAIL,
      payload: message,
    });
  }
};
