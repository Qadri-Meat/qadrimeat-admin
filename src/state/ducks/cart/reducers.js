import * as types from './types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload: product } = action;
  const cartItems = state;
  switch (type) {
    case types.ADD_TO_CART:
      const cartItem = cartItems.filter(
        (item) => item.product === product.product
      )[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity ? product.quantity : 1,
          },
        ];
      } else {
        return cartItems.map((item) =>
          item.product === cartItem.product
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              }
            : item
        );
      }
    case types.DECREASE_QUANTITY:
      if (product.quantity === 1) {
        const remainingItems = (cartItems, product) =>
          cartItems.filter((cartItem) => cartItem.product !== product.product);
        return remainingItems(cartItems, product);
      } else {
        return cartItems.map((item) =>
          item.product === product.product
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    case types.DELETE_FROM_CART:
      const remainingItems = (cartItems, product) =>
        cartItems.filter((cartItem) => cartItem.product !== product.product);
      return remainingItems(cartItems, product);
    case types.DELETE_ALL_FROM_CART:
      return cartItems.filter((item) => {
        return false;
      });
    default:
      return state;
  }
};
