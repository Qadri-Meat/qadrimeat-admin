import * as types from './types';

import InventoryService from '../../services/inventory.service';

export const getInventories = (query) => async (dispatch) => {
  try {
    dispatch({
      type: types.INVENTORY_REQUEST,
    });
    const res = await InventoryService.getAll(query);

    dispatch({
      type: types.GET_INVENTORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.INVENTORY_FAIL,
      payload: message,
    });
  }
};

export const getInventory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.INVENTORY_REQUEST,
    });
    const res = await InventoryService.get(id);

    dispatch({
      type: types.GET_INVENTORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.INVENTORY_FAIL,
      payload: message,
    });
  }
};

export const createInventory = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.INVENTORY_REQUEST,
    });
    const res = await InventoryService.create(data);

    dispatch({
      type: types.CREATE_INVENTORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.INVENTORY_FAIL,
      payload: message,
    });
  }
};

export const updateInventory = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.INVENTORY_REQUEST,
    });
    const res = await InventoryService.update(id, data);

    dispatch({
      type: types.UPDATE_INVENTORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.INVENTORY_FAIL,
      payload: message,
    });
  }
};

export const deleteInventory = (id) => async (dispatch) => {
  try {
    await InventoryService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.INVENTORY_FAIL,
      payload: message,
    });
  }
};
