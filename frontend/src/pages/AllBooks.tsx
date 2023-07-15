/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";
import Card from "../components/Card";
import Loading from "../components/Loading";

const AllBooks = () => {
  const { data: bookData, isLoading } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button className="text-[14px] bg-green-500 text-white px-[12px] py-[4px] rounded-[8px]">
            Reset
          </button>
        </div>
        {/* Filter options */}
        <div className="space-y-2">
          <div className="bg-white p-2 rounded">
            <h2 className="text-[15px] text-gray-400">By Genre:</h2>
            <div className="mt-2">
              <div className="flex items-center mb-[8px]">
                <input
                  className="h-[18px] w-[18px]"
                  id=""
                  type="radio"
                  name="genre"
                />
                <label className="text-[14px] ml-3" htmlFor=""></label>
              </div>
            </div>
          </div>
          <div className="bg-white p-2 rounded">
            <div className="bg-white p-2 rounded">
              <h2 className="text-[15px] text-gray-400">
                By Publication Year:
              </h2>
              <div className="mt-2">
                <div className="flex items-center mb-[8px]">
                  <input
                    className="h-[18px] w-[18px]"
                    id=""
                    type="radio"
                    name="genre"
                  />
                  <label className="text-[14px] ml-3" htmlFor=""></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4">
        {/* Search bar */}
        <div className="flex items-center mb-4">
          <input
            className="border border-gray-300 p-2 mr-2 flex-grow"
            type="text"
            placeholder="Search..."
          />
          <button className="bg-green-500 text-white py-2 px-4 rounded">
            Search
          </button>
        </div>

        {/* All Books */}
        <div className="mt-[20px] mb-[100px]">
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            {bookData?.data?.map((book: IBook, i: number) => (
              <Card key={i} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
