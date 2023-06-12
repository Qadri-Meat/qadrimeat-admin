// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import auth from "store/auth";
import user from "store/user";
import deal from "store/deal";
import booking from "store/booking";
import expense from "store/expense";
import product from "store/product";
import order from "store/order";
import { cartReducer } from "./cart";
export const store = configureStore({
  reducer: {
    auth,
    user,
    deal,
    product,
    booking,
    order,
    expense,
    cart: cartReducer, // Verify that cartReducer is included under the 'cart' key
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
