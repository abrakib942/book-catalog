import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import SignIn from "../pages/SignIn";
import BookDetails from "../pages/BookDetails";
import AllBooks from "../pages/AllBooks";
import EditBook from "../pages/EditBook";
import AddNewBook from "../pages/AddNewBook";
import PrivateRoute from "../layouts/PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "books",
    element: <AllBooks />,
  },
  {
    path: "/details/:id",
    element: <BookDetails />,
  },
  {
    path: "/edit-book/:id",
    element: (
      <PrivateRoute>
        <EditBook />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-new-book",
    element: (
      <PrivateRoute>
        <AddNewBook />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
