import { useEffect } from "react";
import { RoomsList, ChatRoom } from "../components";
import { useAppDispatch } from "../redux/store";
import { privateSocket, publicSocket } from "../services/socket";
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

  const setupSocketMessageListener = ({
    isPrivate,
  }: {
    isPrivate: boolean;
  }) => {
    isPrivate
      ? privateSocket
      : publicSocket.addEventListener("message", (event) => {
          const res = JSON.parse(event.data);
          const content = JSON.parse(res.content);

          switch (res.type) {
            case "room-detail":
              dispatch(saveRoom({ room: content.data }));
              break;

            case "new-message":
              dispatch(
                updateRoomMessage({
                  roomId: content.roomId,
                  message: content.data,
                })
              );
              toast.success("New message received!");
              const sound = localStorage.getItem("sound");
              if (sound === "on") {
                var aSound = document.createElement("audio");
                aSound.setAttribute("src", "/audio/Infographic.mp3");
                aSound.play();
              }
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

            case "room-avatar-changed":
            case "user-joined":
            case "user-left":
              dispatch(deleteRoom({ roomId: content.roomId }));
              toast.success("left room successfully!");
              break;
            case "user-profile-changed":
            default:
              console.warn("Unknown message type:", res.type);
          }
        });
  };

  const socketHandler = () => {
    publicSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
      dispatch(setIsSocketConnected(true));
    });
    privateSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
      dispatch(setIsSocketConnected(true));
    });

    publicSocket.addEventListener("error", (event) => {
      console.log("WebSocket connection error:", event);
      dispatch(setIsSocketConnected(false));
    });
    privateSocket.addEventListener("error", (event) => {
      console.log("WebSocket connection error:", event);
      dispatch(setIsSocketConnected(false));
    });

    setupSocketMessageListener({ isPrivate: true });

    setupSocketMessageListener({ isPrivate: true });
    setupSocketMessageListener({ isPrivate: false });
  };

  useEffect(() => {
    socketHandler();

    const intervalId = setInterval(() => {
      if (
        privateSocket.readyState === WebSocket.OPEN ||
        publicSocket.readyState === WebSocket.OPEN
      ) {
        setIsSocketConnected(
          privateSocket.readyState === WebSocket.OPEN ||
            publicSocket.readyState === WebSocket.OPEN
        );
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
