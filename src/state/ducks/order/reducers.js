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
    case types.UPDATE_ORDER_SUCCESS:
      return {
        loading: false,
        selectedOrder: payload,
      };
    case types.GET_ORDER_SUCCESS:
      return {
        loading: false,
        selectedOrder: payload,
      };
    case types.ORDER_RESET:
      return {};
    default:
      return state;
  }
};

function flattenObject(ob) {
  const toReturn = {};

  Object.keys(ob).map((i) => {
    if (typeof ob[i] === 'object' && ob[i] !== null) {
      const flatObject = flattenObject(ob[i]);
      Object.keys(flatObject).map((x) => {
        toReturn[`${i}.${x}`] = flatObject[x];
        return x;
      });
    } else {
      toReturn[i] = ob[i];
    }
    return i;
  });
  return toReturn;
}
