import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.INVENTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.INVENTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_INVENTORIES_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_INVENTORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_INVENTORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_INVENTORY_SUCCESS:
      return {
        loading: false,
        inventory: payload,
      };
    case types.INVENTORY_RESET:
      return {};
    default:
      return state;
  }
};
