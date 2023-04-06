// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import auth from "store/auth";
import user from "store/user";
import deal from "store/deal";

export const store = configureStore({
  reducer: {
    auth,
    user,
    deal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
