import * as types from './types';

const authInfo = JSON.parse(localStorage.getItem('authInfo'));

const initialState = authInfo
  ? { isLoggedIn: true, ...authInfo }
  : { isLoggedIn: false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        ...payload,
      };
    case types.LOGIN_FAIL:
      return {
        isLoggedIn: false,
        message: payload,
      };
    case types.LOGOUT:
      return {
        isLoggedIn: false,
      };
    case types.REFRESH_TOKEN:
      return {
        ...state,
        ...authInfo,
        tokens: payload,
      };
    default:
      return state;
  }
}
