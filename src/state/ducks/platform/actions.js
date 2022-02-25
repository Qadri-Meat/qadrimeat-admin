import * as types from './types';

import PlatformService from '../../services/platforms.service';

export const getPlatform = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.PLATFORM_REQUEST,
    });
    const res = await PlatformService.get(id);

    dispatch({
      type: types.GET_PLATFORM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};

export const createPlatform = (data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PLATFORM_REQUEST,
    });
    const res = await PlatformService.create(data);

    dispatch({
      type: types.CREATE_PLATFORM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};

export const updatePlatform = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: types.PLATFORM_REQUEST,
    });
    const res = await PlatformService.update(id, data);

    dispatch({
      type: types.UPDATE_PLATFORM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};

export const deletePlatform = (id) => async (dispatch) => {
  try {
    await PlatformService.delete(id);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: types.PLATFORM_FAIL,
      payload: message,
    });
  }
};
