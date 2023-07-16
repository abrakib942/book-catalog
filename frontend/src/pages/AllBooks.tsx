/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from "react";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Navbar from "../layouts/Navbar";

const AllBooks = () => {
  const genres = [
    "Mystery",
    "Fantasy",
    "Science Fiction",
    "Historical Fiction",
    "Poetry",
  ];

  const publicationYears = [
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  const [selectGenre, setSelectGenre] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectpublicationYear, setSelectPublicationYear] = useState("");

  const { data: bookData, isLoading } = useGetBooksQuery({
    search: searchText,
    genre: selectGenre,
    publicationYear: selectpublicationYear,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => {
                setSelectGenre("");
                setSelectPublicationYear("");
              }}
              className="text-[14px] bg-green-500 text-white px-[12px] py-[4px] rounded-[8px]"
            >
              Reset
            </button>
          </div>
          {/* Filter options */}
          <div className="space-y-2">
            <div className="bg-white p-2 rounded">
              <h2 className="text-[15px] text-gray-400">By Genre:</h2>
              <div className="mt-2">
                {genres?.map((genre, i) => {
                  return (
                    <div key={i} className="flex items-center mb-[8px]">
                      <input
                        onChange={() => setSelectGenre(genre)}
                        className="h-[18px] w-[18px]"
                        id={genre}
                        type="radio"
                        name="genre"
                        checked={selectGenre === genre}
                      />
                      <label className="text-[14px] ml-3" htmlFor={genre}>
                        {genre}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white p-2 rounded">
              <div className="bg-white p-2 rounded">
                <h2 className="text-[15px] text-gray-400">
                  By Publication Year:
                </h2>
                <div className="mt-2">
                  {publicationYears?.map((year, i) => {
                    return (
                      <div key={i} className="flex items-center mb-[8px]">
                        <input
                          onChange={() => setSelectPublicationYear(year)}
                          className="h-[18px] w-[18px]"
                          id={year}
                          type="radio"
                          name="year"
                          checked={selectpublicationYear === year}
                        />
                        <label className="text-[14px] ml-3" htmlFor={year}>
                          {year}
                        </label>
                      </div>
                    );
                  })}
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
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-gray-300 p-2 mr-2 flex-grow"
              type="text"
              placeholder="Search..."
            />
          </div>

          <div className="mt-[20px] mb-[100px]">
            <div className="grid grid-cols-3 gap-x-10 gap-y-10">
              {bookData?.data?.map((book: IBook, i: number) => (
                <Card key={i} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllBooks;
