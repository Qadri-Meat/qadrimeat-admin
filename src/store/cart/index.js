import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addAllToCart: (state, action) => {
      const items = action.payload.map((item) => {
        const { createdAt, ...newItem } = item;
        return newItem;
      });
      state.push(...items);
    },
    addToCart: (state, action) => {
      const itemInCart = state.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.filter((item) => item.id !== action.payload);
      return removeItem;
    },
    updateCartItemTime: (state, action) => {
      const { id, time } = action.payload;
      const item = state.find((item) => item.id === id);
      item.time = time;
    },
    updateCartItemDay: (state, action) => {
      const { id, day } = action.payload;
      const item = state.find((item) => item.id === id);
      item.day = day;
    },
    updateCartPackage: (state, action) => {
      const { id, isPackage } = action.payload;
      const item = state.find((item) => item.id === id);
      item.isPackage = isPackage;
    },
    reSetCart: () => {
      return [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addAllToCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  updateCartItemDay,
  updateCartItemTime,
  updateCartPackage,
  reSetCart,
} = cartSlice.actions;
