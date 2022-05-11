import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.EXPENSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.EXPENSE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_EXPENSES_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_EXPENSE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_EXPENSE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_EXPENSE_SUCCESS:
      return {
        loading: false,
        expense: payload,
      };
    case types.EXPENSE_RESET:
      return {};
    default:
      return state;
  }
};
