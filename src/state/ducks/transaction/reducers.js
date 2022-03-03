import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.TRANSACTION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.CREATE_TRANSACTION_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.UPDATE_TRANSACTION_SUCCESS:
      return {
        loading: false,
        selectedTransaction: payload,
      };
    case types.GET_TRANSACTION_SUCCESS:
      return {
        loading: false,
        selectedTransaction: payload,
      };
    case types.TRANSACTION_RESET:
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
