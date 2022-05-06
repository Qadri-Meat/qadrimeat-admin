import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.BOOKING_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_BOOKINGS_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_BOOKING_SUCCESS:
      return {
        loading: false,
        success: true,
        selectedBooking: payload,
      };
    case types.UPDATE_BOOKING_SUCCESS:
      var totalPaid = payload.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        success: true,
        selectedBooking: { ...payload, totalPaid: totalPaid || 0 },
      };
    case types.GET_BOOKING_SUCCESS:
      var totalPaid1 = payload.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        selectedBooking: { ...payload, totalPaid: totalPaid1 || 0 },
      };
    case types.BOOKING_RESET:
      return {};
    default:
      return state;
  }
};
