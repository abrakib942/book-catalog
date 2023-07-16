import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Navbar = () => {
  const email = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    Cookies.remove("token");
    window.location.reload();

    toast.success("Logged out");
  };

  return (
    <div>
      <div className="navbar bg-base-100 px-12">
        <div className="navbar-start">
          <div className="h-24 w-24">
            <img className="h-24 w-24" src={logo} alt="logo" />
          </div>
        </div>
        <div className="navbar-center">
          <div className="">
            <ul className="menu menu-horizontal px-1 font-semibold text-lg">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/books">All Books</Link>
              </li>
              {email && (
                <Link to="/add-new-book">
                  <a className="text-white bg-accent px-3 py-2 mt-8 rounded-md text-sm font-medium">
                    Add New
                  </a>
                </Link>
              )}

              {email ? (
                <li onClick={handleLogout}>
                  <a className="cursor-pointer block px-4 py-2">Sign Out</a>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/signUp">Sign Up</Link>
                  </li>
                  <li>
                    <Link to="/signIn">Sign In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
