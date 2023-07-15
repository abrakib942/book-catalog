import { Link } from "react-router-dom";
import Footer from "../layouts/Footer";
import bannerImg from "../assets/bannerImg.jpeg";

export default function Home() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center ">
          <div>
            <h1 className="text-6xl font-black text-primary mb-2">
              DISCOVER <br /> BOOKS WORLD
            </h1>
            <p className="text-secondary font-semibold text-xl">
              Welcome to Book Catalog!
            </p>
            <div className="text-primary mt-10">
              <q>
                A reader lives a thousand lives before he dies . . . The man who
                never reads lives only one.
              </q>
            </div>
            <button className="mt-5 border-2 border-[#2563EB] hover:bg-[#2563EB] hover:text-white font-[500] px-[12px] py-[4px] rounded-[8px]">
              Explore
            </button>
          </div>
          <div className="">
            <img
              height="600px"
              width="600px"
              className="rounded-[14px]"
              src={bannerImg}
              alt=""
            />
          </div>
        </div>

        <div className="mt-[20px] mb-[100px]">
          <h3 className="text-[20px]  font-[500] text-center my-[30px]">
            Recently Published Books
          </h3>
          <div className="grid grid-cols-3 gap-x-10 gap-y-10">
            {/* {books.map((book, i) => {
              return (
                <Link key={i} to={`/details/${book.id}`}>
                  <Card book={book} />
                </Link>
              );
            })} */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
