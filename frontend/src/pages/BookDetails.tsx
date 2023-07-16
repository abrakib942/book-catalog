/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import Loading from "../components/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import swal from "sweetalert";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetSingleBookQuery(id);

  const [deleteBook] = useDeleteBookMutation();
  // const [isDeleteLoad, setDeleteLoad] = useState(false);
  const handleDeleteBook = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: ["Cancel", "Yes"],
      dangerMode: false,
    }).then(async (willDelete) => {
      if (willDelete) {
        if (id) {
          // setDeleteLoad(true);
          const response: any = await deleteBook(id);
          if (response?.data) {
            swal(response?.data?.message, "", "success");
            navigate("/books");
            // setDeleteLoad(false);
          } else {
            swal("Book delete operation failed!", "", "error");
            // setDeleteLoad(false);
          }
        }
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="container mx-auto py-8">
        {book ? (
          <div className="flex flex-wrap items-start">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <img
                src={book.data.image}
                alt={book.data.title}
                className="max-w-full rounded shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 pl-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-4">{book.data.title}</h2>
                {/* Buttons */}
                <div className="flex items-center">
                  <Link to={`/edit-book/${id as string}`}>
                    <button className="flex items-center px-4 py-[3px] bg-green-500 text-white rounded hover:bg-green-600 mr-3">
                      <FiEdit2 className="text-[18px] mr-2" /> <span>Edit</span>
                    </button>
                  </Link>
                  <button
                    onClick={handleDeleteBook}
                    className="flex items-center px-4 py-[3px] bg-red-500 text-white rounded hover:bg-red-600 ml-3"
                  >
                    <AiFillDelete className="text-[18px] mr-2" />{" "}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
              <p className="text-lg mb-2">
                <span className="font-bold">Author:</span> {book.data.author}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Genre:</span> {book.data.genre}
              </p>
              <p className="text-lg mb-2">
                <span className="font-bold">Publication Year:</span>{" "}
                {moment(book.data.publicationDate).format("DD MMMM, YYYY")}
              </p>
              <h3 className="text-xl font-[500] mt-4 mb-2">
                Summary about {book.data.title}
              </h3>
              <p className="text-lg mb-4">{book.data.summary}</p>

              {/* <form >
                <label htmlFor="review" className="text-lg font-[500] mb-3">
                  Write Review
                </label>
                <textarea
                  id="review"
                  value={review?.comment || ""}
                  onChange={(e) =>
                    setReview({
                      email: "user@RiGameFill.com",
                      comment: e.target.value,
                    })
                  }
                  className="w-full h-32 p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="Write your review here..."
                ></textarea>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Submit Review
                </button>
              </form> */}

              <h3 className="text-xl font-bold mt-6">Customer Reviews</h3>
              {/* <div className="mb-4">
                {customerReviews.length > 0 ? (
                  <ul className="space-y-4">
                    {customerReviews.map((review, index) => (
                      <li key={index} className="flex items-start mt-4">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=2000"
                          alt="User Profile"
                        />
                        <div className="ml-4">
                          <p className="font-[600]">{review.email}</p>
                          <p className="py-2 rounded">{review.comment}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews yet.</p>
                )}
              </div> */}
            </div>
          </div>
        ) : (
          <p>Book not found.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
