import * as types from './types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload: booking } = action;
  const cart1Items = state;

  const cart1Item = booking
    ? cart1Items.filter((item) => {
        return item.id === booking.id;
      })[0]
    : booking;
  switch (type) {
    case types.ADD_ALL_TO_CART1:
      return booking.map((item) => {
        delete item.createdAt;
        delete item.id;
        return item;
      });
    case types.ADD_TO_CART1:
      return [
        ...cart1Items,
        {
          ...booking,
          quantity: booking.quantity ? booking.quantity : 1,
        },
      ];
    case types.UPDATE_CART1_ITEM:
      if (cart1Item === undefined) {
        return cart1Items;
      } else {
        return cart1Items.map((item) =>
          item.id === booking.id ? booking : item
        );
      }
    case types.INCREASE_QUANTITY:
      if (cart1Item === undefined) {
        return cart1Items;
      } else {
        return cart1Items.map((item) =>
          item.id === booking.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }
    case types.DECREASE_QUANTITY:
      if (booking.quantity === 1) {
        const remainingItems = (cart1Items, booking) =>
          cart1Items.filter((cart1Item) => cart1Item.id !== booking.id);
        return remainingItems(cart1Items, booking);
      } else {
        return cart1Items.map((item) =>
          item.id === booking.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    case types.DELETE_FROM_CART1:
      const remainingItems = (cart1Items, booking) =>
        cart1Items.filter((cart1Item) => cart1Item.id !== booking.id);
      return remainingItems(cart1Items, booking);
    case types.DELETE_ALL_FROM_CART1:
      return cart1Items.filter((item) => {
        return false;
      });
    default:
      return state;
  }
};
