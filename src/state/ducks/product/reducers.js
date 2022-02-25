import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_PRODUCT_SUCCESS:
      const initialFiles = payload.image.map((img) => {
        return `${process.env.REACT_APP_API_URL + img}`;
      });
      payload.image = initialFiles;
      return {
        loading: false,
        selectedProduct: payload,
      };
    case types.PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
