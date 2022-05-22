import * as types from './types';

//add to cart
export const addToCart = (item) => {
  return (dispatch) => {
    dispatch({
      type: types.ADD_TO_CART,
      payload: item,
    });
  };
};

//decrease from cart
export const decreaseQuantity = (item) => {
  return (dispatch) => {
    dispatch({ type: types.DECREASE_QUANTITY, payload: item });
  };
};

//decrease from cart
export const changeWeight = (item, weight) => {
  return (dispatch) => {
    dispatch({ type: types.CHANGE_WEIGHT, payload: { ...item, weight } });
  };
};

//delete from cart
export const deleteFromCart = (item) => {
  return (dispatch) => {
    dispatch({ type: types.DELETE_FROM_CART, payload: item });
  };
};

//delete all from cart
export const deleteAllFromCart = () => {
  return (dispatch) => {
    dispatch({ type: types.DELETE_ALL_FROM_CART });
  };
};
