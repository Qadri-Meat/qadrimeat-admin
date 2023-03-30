// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import auth from "store/auth";
import user from "store/user";

import batch from "store/batch";
import tag from "store/tag";

export const store = configureStore({
  reducer: {
    auth,
    user,
    batch,
    tag,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
