import * as types from './types';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_USERS_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_USER_SUCCESS:
      return {
        loading: false,
        user: payload,
      };
    case types.GET_DASHBOARD_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.USER_RESET:
      return {};
    default:
      return state;
  }
};
