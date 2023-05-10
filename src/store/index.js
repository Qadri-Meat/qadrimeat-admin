// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import auth from "store/auth";
import user from "store/user";
import deal from "store/deal";
import booking from "store/booking";
import expense from "store/expense";
import { cartReducer } from "./cart";
export const store = configureStore({
  reducer: {
    auth,
    user,
    deal,
    booking,
    expense,
    reducer: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
