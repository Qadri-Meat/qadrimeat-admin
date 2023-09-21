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
    resetCart: () => {
      return [];
    },
    updateQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.quantity = action.payload.quantity;
    },
    updateDiscount: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.discount = action.payload.discount;
    },
    updateTime: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.time = action.payload.time;
    },
    updateDay: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.day = action.payload.day;
    },
    updatePackage: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);
      item.isPackage = action.payload.isPackage;
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
  resetCart,
  updateQuantity,
  updateDiscount,
  updateDay,
  updateTime,
  updatePackage,
} = cartSlice.actions;
