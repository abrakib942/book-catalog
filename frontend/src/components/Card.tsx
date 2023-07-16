/* eslint-disable @typescript-eslint/restrict-template-expressions */
import moment from "moment";
import { IBook } from "../types/globalTypes";
import { Link } from "react-router-dom";

interface CardProps {
  book: IBook;
}

const Card = ({ book }: CardProps) => {
  return (
    <Link to={`/details/${book._id}`}>
      <div className=" h-auto w-[350px] pl-5 pr-5 mb-5 lg:pl-2 lg:pr-2">
        <div className="bg-white rounded-lg m-h-64 p-2 transform hover:translate-y-2 hover:shadow-xl transition duration-300">
          <figure className="mb-2">
            <img src={book.image} alt="" className="h-64 ml-auto mr-auto" />
          </figure>
          <div className="rounded-lg p-4 bg-primary flex flex-col">
            <div>
              <h5 className="text-white text-xl font-bold">{book.title}</h5>
              <span className="text-sm text-white">Author: {book.author}</span>
            </div>
            <div className="flex items-center">
              <div className="text-lg text-white font-light">
                Genre: {book.genre}
              </div>
            </div>
            <p className="text-[14px] text-white">
              Published by{" "}
              {moment(book.publicationDate).format("DDD MMMM, YYYY")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
