import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import routes from "./routes/route";
import { useEffect } from "react";

export default function App() {
  const history = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/room");
    }
  }, [history]);
  const router = useRoutes(routes);
  return <>{router}</>;
}
