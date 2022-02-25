import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_CATEGORIES_SUCCESS:
      return {
        loading: false,
        results: payload,
      };
    case types.CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        selectedCategory: payload,
      };
    case types.CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
