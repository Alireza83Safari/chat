// ChatContextProvider.tsx
import React, { createContext, useEffect, useReducer, useState } from "react";
import { chatReducer } from "./ChatReducer";
import { RoomType } from "../../types/room.type";
import {
  saveRoomData,
  updateRoomData,
  updateRoomDataWithEdit,
  updateRoomDataWithDelete,
  deleteRoom,
} from "./ChatAction";
import {
  SaveRoomDataAction,
  UpdateRoomMessageAction,
  UpdateRoomMessageWithEditAction,
  UpdateRoomMessageWithDeleteAction,
  deleteRoomAction,
} from "../../types/chat.type";
import { socket } from "../../services/socket";
import toast from "react-hot-toast";

type ChatContextProviderType = {
  children: React.ReactNode;
};

export type ChatContextType = {
  rooms: Record<string, RoomType>;
  socketHandler: () => void;
  isSocketConnected: boolean;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: ChatContextProviderType) => {
  const [state, dispatch] = useReducer(chatReducer, { rooms: {} });
  const rooms = state?.rooms;
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const socketHandler = () => {
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
      setIsSocketConnected(true);
    });

    socket.addEventListener("error", (event) => {
      console.log("WebSocket connection error:", event);
      setIsSocketConnected(false);
    });

    socket.addEventListener("message", (event) => {
      const res = JSON.parse(event.data);
      const content = JSON.parse(res.content);

      switch (res.type) {
        case "room-detail":
          dispatch({
            type: saveRoomData,
            payload: content.data,
          } as SaveRoomDataAction);
          break;

        case "new-message":
          dispatch({
            type: updateRoomData,
            payload: { roomId: content?.roomId, message: content?.data },
          } as UpdateRoomMessageAction);
          toast.success("New message received!");
          break;

        case "edit-message":
          dispatch({
            type: updateRoomDataWithEdit,
            payload: {
              roomId: content?.roomId,
              updatedMessage: content?.data,
            },
          } as UpdateRoomMessageWithEditAction);
          toast.success("Message edited successfully!");
          break;

        case "delete-message":
          dispatch({
            type: updateRoomDataWithDelete,
            payload: {
              roomId: content?.roomId,
              updatedMessage: content?.data,
            },
          } as UpdateRoomMessageWithDeleteAction);
          toast.success("Message deleted successfully!");
          break;

        case "delete-room":
          dispatch({
            type: deleteRoom,
            payload: { roomId: content?.roomId },
          } as deleteRoomAction);
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
    <ChatContext.Provider value={{ rooms, socketHandler, isSocketConnected }}>
      {children}
    </ChatContext.Provider>
  );
};
