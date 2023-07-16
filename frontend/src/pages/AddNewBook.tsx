/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { IBook } from "../types/globalTypes";
import Loading from "../components/Loading";
import { useAddBookMutation } from "../redux/features/book/bookApi";
import toast from "react-hot-toast";

const AddNewBook = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const email = localStorage.getItem("userEmail");

  const [addBook] = useAddBookMutation();

  const [bookInfo, setBookInfo] = useState<IBook>({
    email: "",
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    image: "",
    summary: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (email) {
      bookInfo.email = email;
    }
    setIsLoading(true);
    const response: any = await addBook(bookInfo);
    if (response?.data) {
      toast.success("added successfully");
      // Reset the form fields
      setBookInfo({
        email: "",
        title: "",
        author: "",
        genre: "",
        publicationDate: "",
        image: "",
        summary: "",
      });
      navigate("/books");
      setIsLoading(false);
    } else {
      toast.error("Failed");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto my-[50px]">
        <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="text-lg font-semibold mb-3">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookInfo.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="text-lg font-semibold mb-3">
              Author Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookInfo.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="text-lg font-semibold mb-3">
              Genre
            </label>
            <select
              id="genre"
              name="genre"
              value={bookInfo.genre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
            >
              <option value="">Select Genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Historical Fiction">Historical Fiction</option>
              <option value="Poetry">Poetry</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="publicationDate"
              className="text-lg font-semibold mb-3"
            >
              Publication Date
            </label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              value={bookInfo.publicationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              required
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
              className="w-full"
              required
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
            <label htmlFor="summary" className="text-lg font-semibold mb-3">
              Book Summary (Optional)
            </label>
            <textarea
              id="summary"
              name="summary"
              value={bookInfo.summary}
              onChange={handleChange}
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
              Add Book
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default AddNewBook;
