import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.PLATFORM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PLATFORM_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.CREATE_PLATFORM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_PLATFORM_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_PLATFORM_SUCCESS:
      return {
        loading: false,
        selectedPlatform: payload,
      };
    case types.PLATFORM_RESET:
      return {};
    default:
      return state;
  }
};
