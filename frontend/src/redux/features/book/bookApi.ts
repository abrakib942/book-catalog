/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ search, genre, publicationYear }) => ({
        url: "/books",
        params: { search, genre, publicationYear },
        providesTags: ["addNewBook", "deleteBook"],
      }),
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["bookDetails"],
    }),

    addBook: builder.mutation({
      query: (data) => ({
        url: `/books/add-book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addNewBook"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/update-book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bookDetails"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteBook"],
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = bookApi;
