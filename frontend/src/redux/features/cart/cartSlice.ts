import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../../types/globalTypes";

interface ICart {
  books: IBook[];
}

const initialState: ICart = {
  books: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.filter(
        (book) => book._id !== action.payload._id
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = cartSlice.actions;

export default cartSlice.reducer;
