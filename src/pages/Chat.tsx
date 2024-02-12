import { useEffect } from "react";
import { RoomsList, ChatRoom } from "../components";
import { useAppDispatch } from "../redux/store";
import { socket } from "../services/socket";
import {
  deleteRoom,
  saveRoom,
  setIsSocketConnected,
  updateRoomMessage,
  updateRoomWithDelete,
  updateRoomWithEdit,
} from "../redux/store/chat";
import toast from "react-hot-toast";

const Chat = () => {
  const dispatch = useAppDispatch();

  const socketHandler = () => {
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
      dispatch(setIsSocketConnected(true));
    });

    socket.addEventListener("error", (event) => {
      console.log("WebSocket connection error:", event);
      dispatch(setIsSocketConnected(false));
    });

    socket.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      const content = JSON.parse(res.content);

      switch (res.type) {
        case "room-detail":
          dispatch(saveRoom({ room: content.data }));
          break;

        case "new-message":
          dispatch(
            updateRoomMessage({ roomId: content.roomId, message: content.data })
          );
          toast.success("New message received!");
          break;

        case "edit-message":
          dispatch(
            updateRoomWithEdit({
              roomId: content.roomId,
              updatedMessage: content.data,
            })
          );
          toast.success("Message edited successfully!");
          break;

        case "delete-message":
          dispatch(
            updateRoomWithDelete({
              roomId: content.roomId,
              updatedMessage: content.data,
            })
          );
          toast.success("Message deleted successfully!");
          break;

        case "delete-room":
          dispatch(deleteRoom({ roomId: content.roomId }));
          toast.success("Room deleted successfully!");
          break;

        default:
          console.warn("Unknown message type:", res.type);
      }
    });
  };

  useEffect(() => {
    socketHandler();

    const intervalId = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        setIsSocketConnected(socket.readyState === WebSocket.OPEN);
      } else {
        socketHandler();
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <RoomsList />
      <ChatRoom />
    </>
  );
};

export default Chat;
