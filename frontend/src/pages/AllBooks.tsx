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
    genre: selectGenre !== "" ? selectGenre : undefined,
    publicationYear:
      selectpublicationYear !== "" ? selectpublicationYear : undefined,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="flex justify-center">
        <div className="">
          {/* Search bar */}
          <div className="flex items-center justify-center mb-4">
            <div className="mr-5">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                className="input input-bordered input-primary w-96"
                type="text"
                placeholder="Search..."
              />
            </div>

            <div className="flex items-center gap-5 mb-9">
              <div>
                <label className="label">
                  <span className="label-text">By genre</span>
                </label>
                <select
                  onChange={(event) => setSelectGenre(event.target.value)}
                  className="select select-primary w-full max-w-xs"
                >
                  <option value="">All genres</option>
                  {genres.map((genre) => (
                    <option value={genre} key={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">By Publication Year</span>
                </label>
                <select
                  onChange={(event) =>
                    setSelectPublicationYear(event.target.value)
                  }
                  className="select select-primary w-full max-w-xs"
                >
                  <option value="">All Years</option>
                  {publicationYears.map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
