import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import routes from "./routes/route";
import { useEffect } from "react";
import { AuthContextProvider } from "./context/AuthContext";

export default function App() {
  const history = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/room");
    }
  }, [history]);
  const router = useRoutes(routes);
  return <AuthContextProvider>{router}</AuthContextProvider>;
}
