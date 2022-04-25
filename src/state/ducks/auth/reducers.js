import * as types from './types';

export default function (state = {}, action) {
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
