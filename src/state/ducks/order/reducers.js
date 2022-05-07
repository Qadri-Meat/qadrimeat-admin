import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_ORDERS_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_ORDER_SUCCESS:
      var totalPaid2 = payload.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        success: true,
        selectedOrder: { ...payload, totalPaid: totalPaid2 || 0 },
      };
    case types.UPDATE_ORDER_SUCCESS:
      var totalPaid = payload.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        success: true,
        selectedOrder: { ...payload, totalPaid: totalPaid || 0 },
      };
    case types.GET_ORDER_SUCCESS:
      var totalPaid1 = payload.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        selectedOrder: { ...payload, totalPaid: totalPaid1 || 0 },
      };
    case types.ORDER_RESET:
      return {};
    default:
      return state;
  }
};
