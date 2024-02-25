import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import routes from "./routes/route";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./redux/store";

export default function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/room");
    }
  }, [location?.search, isLoggedIn]);

  const router = useRoutes(routes);

  return (
    <>
      {router}
      <Toaster />
    </>
  );
}
