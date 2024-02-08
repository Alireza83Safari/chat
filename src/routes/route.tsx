import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
  { path: "room", element: <Chat /> },
  { path: "room/:id", element: <Chat /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
];

export default routes;
