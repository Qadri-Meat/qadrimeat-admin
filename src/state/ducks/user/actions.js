import * as types from './types';

import UserService from '../../services/user.service';

export const getUsers = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.getAll(page, limit);

    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.get(id);

    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.create(data);

    dispatch({
      type: types.CREATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.update(id, data);

    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await UserService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
  }
};

export const getDashboard = () => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_REQUEST,
    });
    const res = await UserService.getDashboard();

    dispatch({
      type: types.GET_DASHBOARD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.USER_FAIL,
      payload: message,
    });
  }
};
