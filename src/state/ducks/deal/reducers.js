import * as types from './types';

const initialState = {};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.DEAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.DEAL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.GET_DEALS_SUCCESS:
      return {
        loading: false,
        ...payload,
      };
    case types.CREATE_DEAL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.UPDATE_DEAL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case types.GET_DEAL_SUCCESS:
      const initialFiles = payload.image.map((img) => {
        return `${process.env.REACT_APP_API_URL + img}`;
      });
      payload.image = initialFiles;
      return {
        loading: false,
        selectedDeal: payload,
      };
    case types.DEAL_RESET:
      return {};
    default:
      return state;
  }
};
