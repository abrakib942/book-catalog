import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import users from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
