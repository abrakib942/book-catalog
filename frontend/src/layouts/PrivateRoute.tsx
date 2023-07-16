/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";
import { setLoading } from "../redux/features/user/userSlice";
import Loading from "../components/Loading";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { isLoading } = useAppSelector((state) => state.users);

  const email = localStorage.getItem("userEmail");

  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(setLoading(false));
      setIsInitialLoad(false);
      return;
    }

    if (!email) {
      navigate("/login", { state: { from: location } });
    }
  }, [email, location, navigate, isInitialLoad, dispatch]);

  if (isLoading || isInitialLoad) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
