/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import axios from "axios";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast/headless";

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState<IBook>({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    image: "",
    summary: "",
  });

  let bookData: IBook | null = null;

  const { data, isLoading } = useGetSingleBookQuery(id);
  bookData = data?.data;

  useEffect(() => {
    if (bookData) {
      setBookInfo(bookData);
    }
  }, [bookData, id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", "e87319b893efc024df17a99cb5180564");

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData
        );
        const imageUrl = response.data.data.url;
        setBookInfo({ ...bookInfo, image: imageUrl });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const [updateBook] = useUpdateBookMutation();
  // const [isLoad, setIsLoad] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // setIsLoad(true);
    const response: any = await updateBook({ id: id, data: bookInfo });
    if (response?.data) {
      toast("update successful");
      if (id) {
        navigate(`/details/${id}`);
      }
      // setIsLoad(false);
    } else {
      toast("edit failed");
      // setIsLoad(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-[350px] py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Book Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookInfo.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block mb-2 font-medium">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookInfo.author}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block mb-2 font-medium">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={bookInfo.genre}
            onChange={handleSelectChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select Genre</option>
            <option value="Fantasy">Islamic</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">History</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="publicationDate" className="block mb-2 font-medium">
            Publication Date
          </label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={bookInfo.publicationDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-lg font-semibold mb-3">
            Book Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full mt-2"
          />
        </div>
        {bookInfo.image && (
          <div className="mb-4">
            <img
              src={bookInfo.image}
              alt="Book Cover"
              className="max-w-full mb-2"
              height="350px"
              width="260px"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="summary" className="block mb-2 font-medium">
            Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            value={bookInfo.summary}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Update Book
          </button>
        )}
      </form>
    </div>
  );
};

export default EditBook;
