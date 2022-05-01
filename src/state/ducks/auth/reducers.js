import * as types from './types';

const initialState = localStorage.getItem('authInfo')
  ? JSON.parse(localStorage.getItem('authInfo'))
  : {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
      return payload;
    case types.LOGIN_FAIL:
      return {
        message: payload,
      };
    case types.LOGOUT:
      return {};
    case types.REFRESH_TOKEN:
      return {
        ...state,
        tokens: payload,
      };
    default:
      return state;
  }
}
