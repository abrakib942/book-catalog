import { Link } from "react-router-dom";
import Footer from "../layouts/Footer";

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        Home
      </div>
      <Footer />
    </>
  );
}
