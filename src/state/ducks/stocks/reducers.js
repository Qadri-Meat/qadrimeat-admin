import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.STOCK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.STOCK_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_STOCKS_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_STOCK_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_STOCK_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_STOCK_SUCCESS:
      return {
        loading: false,
        stock: payload,
      };
    case types.STOCK_RESET:
      return {};
    default:
      return state;
  }
};
