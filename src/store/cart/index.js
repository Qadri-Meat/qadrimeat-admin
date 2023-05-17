import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addAllToCart: (state, action) => {
      const items = action.payload.map((item) => {
        const { createdAt, ...newItem } = item;
        return newItem;
      });
      state.cart = [...state.cart, ...items];
    },
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    updateCartItemTime: (state, action) => {
      const { id, time } = action.payload;
      const itemIndex = state.cart.find((item) => item.id === id);
      itemIndex.time = time;
    },

    updateCartItemDay: (state, action) => {
      const { id, day } = action.payload;
      const itemIndex = state.cart.find((item) => item.id === id);
      itemIndex.day = day;
    },
    updateCartPackage: (state, action) => {
      const { id, isPackage } = action.payload;
      const itemIndex = state.cart.find((item) => item.id === id);
      console.log(action.payload);
      itemIndex.isPackage = isPackage;
    },
    reSetCart: (state) => {
      state.cart = [];
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
