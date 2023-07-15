import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
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
              <li>
                <Link to="/signUp">Sign Up</Link>
              </li>
              <li>
                <Link to="/signIn">Sign In</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
