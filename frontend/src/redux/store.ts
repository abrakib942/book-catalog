import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import users from "./features/user/userSlice";
import cart from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
