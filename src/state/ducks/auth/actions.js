import * as types from './types';

import AuthService from '../../services/auth.service';

export const login = (creadentials) => (dispatch) => {
  return AuthService.login(creadentials).then(
    (data) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: data,
      });
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: types.LOGIN_FAIL,
        payload: message,
      });
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: types.LOGOUT,
  });
};

export const refreshToken = (tokens) => (dispatch) => {
  dispatch({
    type: types.REFRESH_TOKEN,
    payload: tokens,
  });
};
