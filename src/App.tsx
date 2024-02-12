import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import routes from "./routes/route";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "./redux/store";
import { fetchUserProfile } from "./redux/store/auth";

export default function App() {
  const history = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/room");
    }
  }, [history]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, []);

  const router = useRoutes(routes);
  return (
    <>
      {router}
      <Toaster />
    </>
  );
}
