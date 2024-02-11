import { useLocation } from "react-router-dom";

const getRoomId = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomId = searchParams.get("roomId");
  return { roomId };
};

export default getRoomId;
