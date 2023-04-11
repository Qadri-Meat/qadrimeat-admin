// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import auth from "store/auth";
import user from "store/user";
import deal from "store/deal";
import booking from "store/booking";
export const store = configureStore({
  reducer: {
    auth,
    user,
    deal,
    booking,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
